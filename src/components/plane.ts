import { Root } from '../main/root'
import { Color, lerpUnclamped, Point } from '../math'
import { PlaneInterpolation, PlaneMode } from '../main/types'
import { initPlaneModes } from './plane-modes'
import { handlePointer } from './utils'

const _color = new Color()
const _color32 = _color.toColor32()

const getCompInterpolation = (color: Color) => {
  const colorPrev = color.clone().hueShift(-1 / 8)
  const colorNext = color.clone().hueShift(1 / 8)
  const interpolate: PlaneInterpolation = (x, y) => {
    if (x < .5) {
      const t = x / .5
      _color.lerpColors(colorPrev, color, t ** .5, 'hsl')

    } else {
      const t = (x - .5) / .5
      _color.lerpColors(color, colorNext, t ** 2, 'hsl')
    }
    if (y < .5) {
      const t = y / .5
      _color.setSaturation(color.hsl.s * t)
    } else {
      const t = (y - .5) / .5
      _color.setSaturation(lerpUnclamped(color.hsl.s, 1, t))
    }
    return _color
  }
  return interpolate
}

export const initPlane = (root: Root, div: HTMLDivElement, mode: PlaneMode) => {
  const { color, store, updateColor } = root

  mode ??= store.get('plane-mode') ?? PlaneMode.hue 

  const canvas = div.querySelector('canvas') as HTMLCanvasElement
  const cursor = div.querySelector('.cursor') as HTMLDivElement
  const cursorCoords = new Point()

  const modes = initPlaneModes(div, mode)

  const context = canvas.getContext('2d')!
  const imageData = new ImageData(256, 256)
  const { data } = imageData

  const newColor = new Color()
  const pointerHandler = handlePointer(div, 0, ({ x, y }) => {
    switch (mode) {
      case 'hue':
        return updateColor(newColor.setHSV(color.hsv.h, x, 1 - y))
      case 'red':
        return updateColor(newColor.setRGB(color.r, x, 1 - y))
      case 'green':
        return updateColor(newColor.setRGB(x, color.g, 1 - y))
      case 'blue':
        return updateColor(newColor.setRGB(x, 1 - y, color.b))
      case 'shift': {
        const interpolate = getCompInterpolation(color)
        interpolate(x, y)
        return updateColor(newColor.copy(_color))
      }
    }
  }, {
    skip: event => {
      const shouldSkip = event.target !== canvas && event.target !== cursor
      if (shouldSkip) {
        mode = (event.target as any).dataset.mode
        store.set('plane-mode', mode)
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
    let interpolateXY: PlaneInterpolation = (x, y) => _color.setRGB(1, 1, 1)
    switch (mode) {
      case 'hue': {
        interpolateXY = (x, y) => {
          return _color.setHSV(color.hsv.h, x, 1 - y)
        }
        cursorCoords.set(color.hsv.s, 1 - color.hsv.v)
        break
      }
      case 'red': {
        interpolateXY = (x, y) => {
          return _color.setRGB(color.r, x, 1 - y)
        }
        cursorCoords.set(color.g, 1 - color.b)
        break
      }
      case 'green': {
        interpolateXY = (x, y) => {
          return _color.setRGB(x, color.g, 1 - y)
        }
        cursorCoords.set(color.r, 1 - color.b)
        break
      }
      case 'blue': {
        interpolateXY = (x, y) => {
          return _color.setRGB(x, 1 - y, color.b)
        }
        cursorCoords.set(color.r, 1 - color.g)
        break
      }
      case 'shift': {
        interpolateXY = getCompInterpolation(color)
        cursorCoords.set(.5, .5)
        break
      }
    }
    updateImage(interpolateXY)
    updateCursor()
    modes.update(mode, cursorCoords, interpolateXY)
  }

  root.onDestroy(destroy)
  root.onUpdate(update)
}
