import { Color } from '../math/color'
import { clamp01 } from '../math/utils'
import { Root } from '../main/root'
import { getBackgroundImage, handlePointer } from './utils'
import { factory } from '../main/html'

export enum SliderMode {
  hue = 'hue',
  red = 'red',
  green = 'green',
  blue = 'blue',
  luminosity = 'luminosity',
  saturation = 'saturation',
  alpha = 'alpha',
}

const _color = new Color()
const _color32 = _color.toColor32()

export const initSlider = (root: Root, mode: SliderMode) => {
  const { div: rootDiv, color, updateColor } = root
  const slidersDiv = rootDiv.querySelector('.sliders') as HTMLDivElement
  const div = factory.slider()
  slidersDiv.append(div)

  div.classList.add(mode)
  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement

  if (mode === SliderMode.alpha) {
    div.querySelector('canvas')!.style.backgroundImage = getBackgroundImage()
  }

  if (mode !== SliderMode.hue) {
    cursor.innerHTML = `<span>${mode[0].toUpperCase()}</span>`
  }

  const context = canvas.getContext('2d')!
  const imageData = new ImageData(256, 1)
  const { data } = imageData

  const margin = 9

  const newColor = new Color()
  const pointerHandler = handlePointer(div, margin, ({ x }) => {
    switch(mode) {
      case SliderMode.hue:
        return updateColor(newColor.setHSL(x, color.hsl.s, color.hsl.l, color.a))
      case SliderMode.red:
        return updateColor(newColor.set(x, color.g, color.b, color.a))
      case SliderMode.green:
        return updateColor(newColor.set(color.r, x, color.b, color.a))
      case SliderMode.blue:
        return updateColor(newColor.set(color.r, color.g, x, color.a))
      case SliderMode.luminosity:
        return updateColor(newColor.setHSL(color.hsl.h, color.hsl.s, x, color.a))
      case SliderMode.saturation:
        return updateColor(newColor.setHSL(color.hsl.h, x, color.hsl.l, color.a))
      case SliderMode.alpha:
        return updateColor(newColor.set(color.r, color.g, color.b, x))
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
      data[i + 3] = _color32.a
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
      case SliderMode.hue: {
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

      case SliderMode.red: {
        imageUpdate(t => {
          _color.set(t, color.g, color.b)
        })
        cursorUpdate(color.r)
        cursor.style.backgroundColor = 'white'
        break
      }

      case SliderMode.green: {
        imageUpdate(t => {
          _color.set(color.r, t, color.b)
        })
        cursorUpdate(color.g)
        cursor.style.backgroundColor = 'white'
        break
      }

      case SliderMode.blue: {
        imageUpdate(t => {
          _color.set(color.r, color.g, t)
        })
        cursorUpdate(color.b)
        cursor.style.backgroundColor = 'white'
        break
      }

      case SliderMode.luminosity: {
        imageUpdate(t => {
          _color.setHSL(color.hsl.h, color.hsl.s, t)
        })
        cursorUpdate(color.hsl.l)
        cursor.style.backgroundColor = 'white'
        break
      }

      case SliderMode.saturation: {
        imageUpdate(t => {
          _color.setHSL(color.hsl.h, t, color.hsl.l)
        })
        cursorUpdate(color.hsl.s)
        cursor.style.backgroundColor = 'white'
        break
      }

      case SliderMode.alpha: {
        imageUpdate(t => {
          _color.set(color.r, color.g, color.b, t)
        })
        cursorUpdate(color.a)
        cursor.style.backgroundColor = 'white'
        break
      }
    }
  }

  root.onDestroy(destroy)
  root.onUpdate(update)
}
