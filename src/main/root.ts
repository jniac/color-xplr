import { Color } from '../math/color'
import { Store } from './type'
import { Node } from '../core/node'

/**
 * @internal
 * The root internal node
 */
export class Root extends Node {
  div: HTMLDivElement
  store: Store
  initialColor: Color
  color: Color
  updateColor: (newColor: Color) => void
  constructor(div: HTMLDivElement, store: Store, initialColor: Color, color: Color, updateColor: (newColor: Color) => void) {
    super()
    this.div = div
    this.store = store
    this.initialColor = initialColor
    this.color = color
    this.updateColor = updateColor
  }
}

/**
 * @public
 * Color Xplr public application. That node is internally handled by the "root" node.
 */
export class ColorXplrApp extends Node {
  initialColor: Color
  color: Color
  element: HTMLElement
  constructor(element: HTMLElement, initialColor: Color, color: Color) {
    super()
    this.element = element
    this.initialColor = initialColor
    this.color = color
  }
  get colorHasChanged() {
    return this.color.isEquivalent(this.initialColor) === false
  }
  get hex() {
    return this.color.toCss()
  }
}
