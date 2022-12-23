import { rgb_to_hsl, rgb_to_hsv, hsl_to_rgb, hsv_to_rgb, rgb_to_grayscale } from './color-conversion'
import { clamp01, lerpUnclamped, moduloShortLerp, positiveModulo, to0xff } from './utils'

/**
 * Utility class that represents a color (rgba + hsl / hsv).
 * @public
 */
export class Color {
  r = 1
  g = 1
  b = 1
  a = 1

  hsl = {
    h: 0,
    s: 1,
    l: 1,
  }

  hsv = {
    h: 0,
    s: 0,
    v: 1,
  }

  isEquivalent(other: Color) {
    return (
      this.r === other.r
      && this.g === other.g
      && this.b === other.b
      && this.a === other.a  
    )    
  }

  copy(other: Color) {
    this.r = other.r
    this.g = other.g
    this.b = other.b
    this.a = other.a
    this.hsl.h = other.hsl.h
    this.hsl.s = other.hsl.s
    this.hsl.l = other.hsl.l
    this.hsv.h = other.hsv.h
    this.hsv.s = other.hsv.s
    this.hsv.v = other.hsv.v
    return this
  }

  clone() {
    return new Color().copy(this)
  }

  setRGB(r: number, g: number, b: number, a = 1) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
    rgb_to_hsl(this.r, this.g, this.b, this.hsl)
    rgb_to_hsv(this.r, this.g, this.b, this.hsv)
    return this
  }

  /**
   * h,s,l ranges are [0.0, 1.0]
  */
  setHSL(h: number, s: number, l: number, a = 1) {
    h = positiveModulo(h, 1)
    s = clamp01(s)
    l = clamp01(l)
    this.hsl.h = h
    this.hsl.s = s
    this.hsl.l = l
    this.a = a
    hsl_to_rgb(h, s, l, this)
    rgb_to_hsv(this.r, this.g, this.b, this.hsv)
    return this
  }

  /**
   * h,s,l ranges are [0.0, 1.0]
  */
  setHSV(h: number, s: number, v: number, a = 1) {
    h = positiveModulo(h, 1)
    s = clamp01(s)
    v = clamp01(v)
    this.hsv.h = h
    this.hsv.s = s
    this.hsv.v = v
    this.a = a
    hsv_to_rgb(h, s, v, this)
    rgb_to_hsl(this.r, this.g, this.b, this.hsl)
    return this
  }

  fromHex(hex: number) {
    hex = Math.floor(hex)
    const r = (hex >> 16 & 255) / 255
    const g = (hex >> 8 & 255) / 255
    const b = (hex & 255) / 255
    return this.setRGB(r, g, b)
  }

  fromCss(str: string) {
    if (/^#?[0-9a-f]{6}$/i.test(str)) {
      return this.fromHex(Number.parseInt(str.slice(-6), 16))
    }
    throw new Error(`Unsupported string format: "${str}"`)
  }

  set(arg: string | number | { r: number; g: number; b: number; a?: number } | { h: number; s: number; l: number; a?: number }) {
    switch(typeof arg) {
      case 'string': {
        return this.fromCss(arg)
      }
      case 'number': {
        return this.fromHex(arg)
      }
      case 'object': {
        if ('r' in arg) {
          return this.setRGB(arg.r, arg.g, arg.b, arg.a)
        }
        if ('h' in arg) {
          return this.setHSL(arg.h, arg.s, arg.l, arg.a)
        }
      }
    }
    throw new Error(`Invalid argument: ${arg}`)
  }

  lerpColors(color1: Color, color2: Color, alpha: number, mode: 'rgb' | 'hsl' | 'hsv' = 'rgb') {
    switch(mode) {
      case 'rgb': {
        const r = lerpUnclamped(color1.r, color2.r, alpha)
        const g = lerpUnclamped(color1.g, color2.g, alpha)
        const b = lerpUnclamped(color1.b, color2.b, alpha)
        const a = lerpUnclamped(color1.a, color2.a, alpha)
        this.setRGB(r, g, b, a)
        break
      }
      case 'hsl': {
        const h = moduloShortLerp(color1.hsl.h, color2.hsl.h, 1, alpha)
        const s = lerpUnclamped(color1.hsl.s, color2.hsl.s, alpha)
        const l = lerpUnclamped(color1.hsl.l, color2.hsl.l, alpha)
        const a = lerpUnclamped(color1.a, color2.a, alpha)
        this.setHSL(h, s, l, a)
        break
      }
      case 'hsv': {
        const h = moduloShortLerp(color1.hsv.h, color2.hsv.h, 1, alpha)
        const s = lerpUnclamped(color1.hsv.s, color2.hsv.s, alpha)
        const v = lerpUnclamped(color1.hsv.v, color2.hsv.v, alpha)
        const a = lerpUnclamped(color1.a, color2.a, alpha)
        this.setHSV(h, s, v, a)
        break
      }
      default: {
        throw new Error(`Invalid mode: "${mode}"`)
      }
    }
    return this
  }

  hueShift(delta: number) {
    const { h, s, l } = this.hsl
    return this.setHSL(positiveModulo(h + delta, 1), s, l)
  }

  setSaturation(value: number) {
    const { h, l } = this.hsl
    return this.setHSL(h, value, l)
  }

  negate(mode: 'rgb' | 'hsl' | 'hsv' = 'rgb') {
    switch(mode) {
      case 'rgb': {
        return this.setRGB(1 - this.r, 1 - this.g, 1 - this.b)
      }
      case 'hsl': {
        const { h, s, l } = this.hsl
        return this.setHSL((h + .5) % 1, 1 - s, 1 - l)
      }
      case 'hsv': {
        const { h, s, v } = this.hsv
        return this.setHSV((h + .5) % 1, 1 - s, 1 - v)
      }
      default: {
        throw new Error(`Invalid mode: "${mode}"`)
      }
    }
  }

  opposite() {
    let { h, s, l } = this.hsl
    h = (h + .5) % 1
    l = l > .5 ? l - .5 : l + .5
    return this.setHSL(h, s, l)
  }

  toColor32(out = { r: 0, g: 0, b: 0, a: 1 }) {
    let { r, g, b, a } = this
    out.r = to0xff(r)
    out.g = to0xff(g)
    out.b = to0xff(b)
    out.a = to0xff(a)
    return out
  }

  toGrayscale() {
    return rgb_to_grayscale(this.r, this.g, this.b)
  }

  toGrayscaleCss() {
    const channel = to0xff(this.toGrayscale()).toString(16).padStart(2, '0')
    return `#${channel}${channel}${channel}`
  }

  toHex() {
    return (to0xff(this.r) << 16) + (to0xff(this.g) << 8) + to0xff(this.b)
  }

  toCss() {
    return `#${this.toHex().toString(16).padStart(6, '0')}`
  }
}
