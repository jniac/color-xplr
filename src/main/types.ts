import { SpaceAlign } from '../math'
import { Color } from '../math/color'
import { ColorXplrApp } from './root'

/**
 * Mode of color exploration.
 * @public
 */
export enum PlaneMode {
  hue = 'hue',
  red = 'red',
  green = 'green',
  blue = 'blue',
  shift = 'shift',
}

export type PlaneInterpolation = (x: number, y: number) => Color

/**
 * @public
 * Style settings of the Color Explorer.
 */
export type StyleSettigns = Partial<{
  /** The width of the Color Explorer element, default is 240 (px). */
  width: number | string
  /** The height of... the sliders! */
  sliderHeight: number | string
  /** Ok, it's what you guessed. */
  backgroundColor: string
}>

/**
 * @public
 */
export type ModalArg = {
  source: HTMLElement
  outerRect?: Window | HTMLElement
  outerMargin?: number
  container?: HTMLElement
  zIndex?: number
  align?: SpaceAlign
}

/**
 * @public
 */
export type CreateColorXplrArg = Partial<{
  /** The key used for local storage of preferences. */
  storeKey: string
  /** Should the Color Xplr be displayed through a modal? If so, precise here the source element. */
  modal: ModalArg
  mode: PlaneMode
  color: string
  onChange: (app: ColorXplrApp) => void
  onFinish: (app: ColorXplrApp) => void
}> & StyleSettigns
