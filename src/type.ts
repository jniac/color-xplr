import { Color } from './math/color'

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

export type ColorXplrApp = Readonly<{
  div: HTMLDivElement
  color: Color
  store: Store
  updateColor: (newColor: Color) => void
  destroyed: boolean
  destroy: () => void
}>

export type InterpolationXY = (x: number, y: number) => Color
