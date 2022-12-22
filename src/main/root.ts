import { Color } from '../math/color'
import { Store } from './type'
import { Node } from '../core/node'

/**
 * @internal
 * The root internal node
 */
export class Root extends Node {
  div: HTMLDivElement
  color: Color
  store: Store
  updateColor: (newColor: Color) => void
  constructor(div: HTMLDivElement, color: Color, store: Store, updateColor: (newColor: Color) => void) {
    super()
    this.div = div
    this.color = color
    this.store = store
    this.updateColor = updateColor
  }
}

/**
 * @public
 * Color Xplr public application. That node is internally handled by the "root" node.
 */
export class ColorXplrApp extends Node {
  color: Color
  constructor(color: Color) {
    super()
    this.color = color
  } 
}
