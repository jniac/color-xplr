import { Color } from '../math/color'
import { handlePointer } from './utils'

const _color = new Color()
const _color32 = _color.toColor32()

type PlaneMode = 'hue' | 'red' | 'green' | 'blue' | 'luminosity' | 'saturation'

export const initPlane = (color: Color, updateColor: (newColor: Color) => void, div: HTMLDivElement) => {
  let mode: PlaneMode  = 'blue'
  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement

  const context = canvas.getContext('2d')!
  const imageData = new ImageData(256, 256)
  const { data } = imageData

  const newColor = new Color()
  const pointerHandler = handlePointer(div, 0, ({ x, y }) => {
    switch(mode) {
      case 'hue':
        return updateColor(newColor.setHSV(color.hsv.h, x, 1 - y))
      case 'red':
        return updateColor(newColor.setRGB(x, y, color.b))
      case 'green':
        return updateColor(newColor.setRGB(color.r, x, color.b))
      case 'blue':
        return updateColor(newColor.setRGB(x, y, color.b))
      case 'luminosity':
        return updateColor(newColor.setHSL(color.hsl.h, color.hsl.s, x))
      case 'saturation':
        return updateColor(newColor.setHSL(color.hsl.h, x, color.hsl.l))
    }
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
      case 'blue': {
        updateImage((x, y) => {
          _color.setRGB(x, y, color.b)
        })
        updateCursor(color.r, color.g)
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
