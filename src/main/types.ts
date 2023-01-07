import { SpaceAlign } from '../math'
import { Color } from '../math/color'
import { ColorXplrApp } from './root'

/**
 * @public
 * Mode of color exploration.
 */
export enum PlaneMode {
  hue = 'hue',
  red = 'red',
  green = 'green',
  blue = 'blue',
  shift = 'shift',
}

export type PlaneInterpolation = (x: number, y: number) => Color

/** @public */
export const styleParamsDefaults = {
  /** The width of the Color Explorer element, default is 240 (px). */
  width: <number | string> 240,

  /** The height of... the sliders! */
  sliderHeight: <number | string> 18,
  
  /** Ok, it's what you guessed. */
  backgroundColor: <string> '#eee',
}

/** @public */
export type StyleParams = Partial<typeof styleParamsDefaults>

/** @public */
export const modalParamsDefaults = {
  /** The source element to which the panel should be attached. Required. */
  source: <HTMLElement | undefined> undefined,
  
  /** The container element where to append the child. */
  container: <HTMLElement> document.body,
  
  /** The outer rect. Defaults to the bounding client rect of the container. */
  containerRect: <HTMLElement | undefined> undefined,
  
  /** The padding to apply to the outer rect. Defaults to 24. */
  containerPadding: <number> 16,
  
  /** The margin to apply around the source. Defaults to 8. */
  sourceMargin: <number> 8,
  
  /** The z-index of the modal. Defaults to 10. */
  zIndex: <number> 10,
  
  /** The align value. Defaults to "center". */
  align: <SpaceAlign> 'center',
}

/** @public */
export type ModalParams = typeof modalParamsDefaults

/** @public */
export const colorXplrParamsDefaults = {
  /** The key used for local storage of preferences. */
  storeKey: <string> 'color-xplr',

  /** Should the Color Xplr be displayed through a modal? If so, precise here the source element (for positioning). */
  modal: <ModalParams | undefined> undefined,

  /** Some optional style options in hashmap here. */
  style: <StyleParams | undefined> undefined,

  /** The mode of the "plane" (the top square). */
  mode: <PlaneMode> PlaneMode.hue,

  /** 
   * The initial color, accepted values:
   * - #RRGGBB
   * - #RGB
   * - rgb(255, 255, 255)
   * - rgb(0%, 100%, 100%)
  */
  color: <string> '#e9e59a',

  /** Should the Color Xplr use the alpha channel? */
  alpha: <boolean> true,

  /** Should the app automatically remove on destroy? Defaults to false (One element, mounted on the fly, once, and reused mount to mount). */
  removeStyleElementOnDestroy: <boolean> false,

  /** A callback executed when the color changes. */
  onChange: <((app: ColorXplrApp) => void) | undefined> undefined,

  /** A callback executed when the color changes. */
  onFinish: <((app: ColorXplrApp) => void) | undefined> undefined,
}

/** @public */
export type ColorXplrParams = Partial<typeof colorXplrParamsDefaults>