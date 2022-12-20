import { Color } from '../math/color'
import { handlePointer } from './utils'

const _color = new Color()
const _color32 = _color.toColor32()

const planeModes = ['hue', 'red', 'green', 'blue'] as const
type PlaneMode = (typeof planeModes)[number]

export const initPlane = (color: Color, updateColor: (newColor: Color) => void, div: HTMLDivElement) => {
  let mode: PlaneMode  = 'hue'
  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement
  const modes = div.querySelector('.modes') as HTMLDivElement

  for (const mode of planeModes) {
    const div = document.createElement('div')
    div.innerHTML = mode
    modes.appendChild(div)
  }

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
      const shouldSkip = event.target !== canvas
      if (shouldSkip) {
        mode = (event.target as any).innerHTML
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

  const updateCursor = (x: number, y: number) => {
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
        updateCursor(color.hsv.s, 1 - color.hsv.v)
        break
      }
      case 'red': {
        updateImage((x, y) => {
          _color.setRGB(color.r, x, 1 - y)
        })
        updateCursor(color.g, 1 - color.b)
        break
      }
      case 'green': {
        updateImage((x, y) => {
          _color.setRGB(x, color.g, 1 - y)
        })
        updateCursor(color.r, 1 - color.b)
        break
      }
      case 'blue': {
        updateImage((x, y) => {
          _color.setRGB(x, 1 - y, color.b)
        })
        updateCursor(color.r, 1 - color.g)
        break
      }
    }
  }

  return {
    get updateDuration() { return updateDuration },
    update,
    destroy,
  }
}
