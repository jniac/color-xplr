import { Color, Point } from '../math'
import { PlaneMode, initPlaneModes } from './plane-modes'
import { handlePointer } from './utils'

const _color = new Color()
const _color32 = _color.toColor32()

export const initPlane = (color: Color, updateColor: (newColor: Color) => void, div: HTMLDivElement) => {
  let mode: PlaneMode  = 'hue'
  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement
  const cursorCoords = new Point()

  const modes = initPlaneModes(div, mode)

  const context = canvas.getContext('2d')!
  const imageData = new ImageData(256, 256)
  const { data } = imageData

  const newColor = new Color()
  const pointerHandler = handlePointer(div, 0, ({ x, y }) => {
    switch(mode) {
      case 'hue':
        return updateColor(newColor.setHSV(color.hsv.h, x, 1 - y))
      case 'red':
        return updateColor(newColor.setRGB(color.r, x, 1 - y))
      case 'green':
        return updateColor(newColor.setRGB(x, color.g, 1 - y))
      case 'blue':
        return updateColor(newColor.setRGB(x, 1 - y, color.b))
    }
  }, {
    skip: event => {
      const shouldSkip = event.target !== canvas && event.target !== cursor
      if (shouldSkip) {
        mode = (event.target as any).dataset.mode
        update()
      }
      return shouldSkip
    },
  })

  const destroy = () => {
    pointerHandler.destroy()
  }

  let updateDuration = 0
  const updateImage = (callback: (x: number, y: number) => void) => {
    updateDuration = -performance.now()
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        callback(x / 255, y / 255)
        _color.toColor32(_color32)
        const i = (y * 256 + x) * 4
        data[i + 0] = _color32.r
        data[i + 1] = _color32.g
        data[i + 2] = _color32.b
        data[i + 3] = 0xff
      }
    }
    updateDuration += performance.now()
    // console.log(`plane update: ${updateDuration.toFixed(2)}ms`)
    context.putImageData(imageData, 0, 0)
  }

  const updateCursor = () => {
    const { x, y } = cursorCoords
    const left = x * 100
    const top = y * 100
    cursor.style.left = `${left.toFixed(1)}%`
    cursor.style.top = `${top.toFixed(1)}%`
    cursor.style.backgroundColor = color.toCss()
  }

  const update = () => {
    switch(mode) {
      case 'hue': {
        updateImage((x, y) => {
          _color.setHSV(color.hsv.h, x, 1 - y)
        })
        cursorCoords.set(color.hsv.s, 1 - color.hsv.v)
        break
      }
      case 'red': {
        updateImage((x, y) => {
          _color.setRGB(color.r, x, 1 - y)
        })
        cursorCoords.set(color.g, 1 - color.b)
        break
      }
      case 'green': {
        updateImage((x, y) => {
          _color.setRGB(x, color.g, 1 - y)
        })
        cursorCoords.set(color.r, 1 - color.b)
        break
      }
      case 'blue': {
        updateImage((x, y) => {
          _color.setRGB(x, 1 - y, color.b)
        })
        cursorCoords.set(color.r, 1 - color.g)
        break
      }
    }
    updateCursor()
    modes.update(mode, cursorCoords)
}

  return {
    get updateDuration() { return updateDuration },
    update,
    destroy,
  }
}
