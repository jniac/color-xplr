import { Color } from '../math/color'
import { clamp01 } from '../math/utils'
import { computeEventXY, handlePointer } from './utils'

const rangeModes = ['hue', 'red', 'green', 'blue', 'luminosity', 'saturation'] as const
type RangeMode = (typeof rangeModes)[number]

const _color = new Color()
const _color32 = _color.toColor32()

export const initRange = (color: Color, updateColor: (newColor: Color) => void, div: HTMLDivElement, mode: RangeMode) => {
  div.classList.add(mode)
  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement

  if (mode !== 'hue') {
    cursor.innerHTML = `<span>${mode[0].toUpperCase()}</span>`
  }

  const context = canvas.getContext('2d')!
  const imageData = new ImageData(256, 1)
  const { data } = imageData

  const margin = 8

  const newColor = new Color()
  const pointerHandler = handlePointer(div, margin, ({ x }) => {
    switch(mode) {
      case 'hue':
        return updateColor(newColor.setHSL(x, color.hsl.s, color.hsl.l))
      case 'red':
        return updateColor(newColor.setRGB(x, color.g, color.b))
      case 'green':
        return updateColor(newColor.setRGB(color.r, x, color.b))
      case 'blue':
        return updateColor(newColor.setRGB(color.r, color.g, x))
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
  const imageUpdate = (callback: (t: number) => void) => {
    updateDuration = -performance.now()
    for (let x = 0; x < 256; x++) {
      const t = clamp01((x - margin) / (0xff - 2 * margin))
      callback(t)
      _color.toColor32(_color32)
      const i = x * 4
      data[i + 0] = _color32.r
      data[i + 1] = _color32.g
      data[i + 2] = _color32.b
      data[i + 3] = 0xff
    }
    updateDuration += performance.now()
    // console.log(`plane update: ${updateDuration.toFixed(2)}ms`)
    context.putImageData(imageData, 0, 0)
  }

  const cursorUpdate = (x: number) => {
    const left = margin + (div.offsetWidth - 2 * margin) * x
    cursor.style.left = `${left.toFixed(1)}px`
  }

  const update = () => {
    switch (mode) {
      case 'hue': {
        imageUpdate(t => {
          _color.setHSL(t, 1, .5)
        })
        cursorUpdate(color.hsv.h)
        // canvas.style.borderColor = color.toCss()
        const colorCss = color.toGrayscaleCss()
        canvas.style.borderColor = colorCss
        cursor.style.borderColor = colorCss
        cursor.style.backgroundColor = _color.setHSV(color.hsv.h, 1, 1).toCss()
        break
      }

      case 'red': {
        imageUpdate(t => {
          _color.setRGB(t, color.g, color.b)
        })
        cursorUpdate(color.r)
        cursor.style.backgroundColor = 'white'
        break
      }

      case 'green': {
        imageUpdate(t => {
          _color.setRGB(color.r, t, color.b)
        })
        cursorUpdate(color.g)
        cursor.style.backgroundColor = 'white'
        break
      }

      case 'blue': {
        imageUpdate(t => {
          _color.setRGB(color.r, color.g, t)
        })
        cursorUpdate(color.b)
        cursor.style.backgroundColor = 'white'
        break
      }

      case 'luminosity': {
        imageUpdate(t => {
          _color.setHSL(color.hsl.h, color.hsl.s, t)
        })
        cursorUpdate(color.hsl.l)
        cursor.style.backgroundColor = 'white'
        break
      }

      case 'saturation': {
        imageUpdate(t => {
          _color.setHSL(color.hsl.h, t, color.hsl.l)
        })
        cursorUpdate(color.hsl.s)
        cursor.style.backgroundColor = 'white'
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
