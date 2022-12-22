import { Color } from '../math/color'

export enum PlaneMode {
  hue = 'hue',
  red = 'red',
  green = 'green',
  blue = 'blue',
  shift = 'shift',
}

export type Store = {
  get: (key: string) => any
  set: (key: string, value: any) => void
}

export type InterpolationXY = (x: number, y: number) => Color
