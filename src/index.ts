import { Destroyable, Node, NodeCallback } from './core/node'
import { createColorXplr } from './main/createColorXplr'
import { ColorXplrApp } from './main/root'
import {
  PlaneMode,
  ColorXplrParams,
  ModalParams,
  StyleParams,
  modalParamsDefaults,
  styleParamsDefaults,
  colorXplrParamsDefaults
} from './main/types'
import { 
  Color,
  ColorToStringMode,
  ColorToStringAlphaMode,
  HorizontalAlign,
  HorizontalAlignBase,
  SpaceAlign,
  VerticalAlignBase,
  VerticalAlign,
} from './math'

export {
  SpaceAlign,
  HorizontalAlignBase,
  HorizontalAlign,
  VerticalAlignBase,
  VerticalAlign,
  Color,
  ColorToStringMode,
  ColorToStringAlphaMode,
  ModalParams,
  modalParamsDefaults,
  StyleParams,
  styleParamsDefaults,
  ColorXplrParams,
  colorXplrParamsDefaults,
  ColorXplrApp,
  createColorXplr,
  PlaneMode as ColorXplrMode,
  Node as ColorXplrNode,
  Destroyable as ColorXplrDestroyable,
  NodeCallback as ColorXplrNodeCallback,
}
