
/**
 * Horizontal alignment basic declaration.
 * @public
 */
export type HorizontalAlignBase = 'left' | 'right' | 'center'
const isHorizontalAlignBase = (value: string): value is HorizontalAlignBase => (
  value === 'left'
  || value === 'right'
  || value === 'center'
)
/**
 * Horizontal alignment.
 * @public
 */
export type HorizontalAlign = HorizontalAlignBase | `${number}` | number
/**
 * Vertical alignment basic declaration.
 * @public
 */
export type VerticalAlignBase = 'top' | 'bottom' | 'middle'
const isVerticalAlignBase = (value: string): value is VerticalAlignBase => (
  value === 'top'
  || value === 'bottom'
  || value === 'middle'
)
/**
 * Vertical alignment.
 * @public
 */
export type VerticalAlign = VerticalAlignBase | `${number}` | number
const resolveAlign = (value: HorizontalAlign | VerticalAlign) => {
  if (typeof value === 'number') {
    return value
  }
  switch (value) {
    case 'center':
    case 'middle': {
      return .5
    }
    case 'left':
    case 'top': {
      return 0
    }
    case 'right':
    case 'bottom': {
      return 1
    }
    default: {
      return Number.parseFloat(value)
    }
  }
}

/**
 * Complex, permissive type for space (2d) alignment declarations.
 * @public
 */
export type SpaceAlign =
  | 'center'
  | VerticalAlignBase
  | HorizontalAlignBase
  | `${VerticalAlign}-${HorizontalAlign}`
  | { x: HorizontalAlign, y: VerticalAlign }
const resolveSpaceAlign = (value: SpaceAlign, out = new Point()) => {
  out.set(.5, .5)
  if (typeof value === 'string') {
    if (isHorizontalAlignBase(value)) {
      out.x = resolveAlign(value)
    } else if (isVerticalAlignBase(value)) {
      out.y = resolveAlign(value)
    } else {
      // NOTE: string declaration is "axis-reversed" (eg: "top-left")
      const [y, x] = value.split('-')
      out.x = resolveAlign(x as HorizontalAlign)
      out.y = resolveAlign(y as VerticalAlign)
    }
    return out
  }
  const { x, y } = value
  out.x = resolveAlign(x as HorizontalAlign)
  out.y = resolveAlign(y as VerticalAlign)
  return out
}

export class Point {
  x = 0
  y = 0
  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
  clone() {
    return new Point().set(this.x, this.y)
  }
  apply(arg: number | SpaceAlign) {
    if (typeof arg === 'number') {
      this.set(arg, arg)
    } else {
      resolveSpaceAlign(arg, this)
    }
    return this
  }
  comp() {
    this.x = 1 - this.x
    this.y = 1 - this.y
    return this
  }
}

let tmpPoint: Point
const getTmpPoint = () => {
  return tmpPoint ?? (tmpPoint = new Point())
}

export class Rect {
  x = 0
  y = 0
  width = 0
  height = 0
  set(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    return this
  }
  apply({
    left = this.left,
    right = this.right,
    top = this.top,
    bottom = this.bottom,
    x = left,
    y = top,
    width = right - left,
    height = bottom - top,
  }: Partial<{
    left: number
    right: number
    top: number
    bottom: number
    x: number
    y: number
    width: number
    height: number
  }>) {
    return this.set(x, y, width, height)
  }
  contains(other: Rect) {
    return (
      this.x <= other.x
      && this.y <= other.y 
      && this.x + this.width >= other.x + other.width 
      && this.y + this.height >= other.y + other.height 
    )
  }
  moveInside(outerRect: Rect) {
    if (outerRect.width < this.width) {
      this.setCenterX(outerRect.centerX)
    } else {
      if (this.x < outerRect.x) {
        this.x = outerRect.x
      } else if (this.x + this.width > outerRect.x + outerRect.width) {
        this.x = outerRect.x + outerRect.width - this.width
      }
    }
    if (outerRect.height < this.height) {
      this.setCenterY(outerRect.centerY)
    } else {
      if (this.y < outerRect.y) {
        this.y = outerRect.y
      } else if (this.y + this.height > outerRect.y + outerRect.height) {
        this.y = outerRect.y + outerRect.height - this.height
      }
    }
    return this
  }
  inflate(arg: Parameters<Point['apply']>[0]) {
    const { x, y } = getTmpPoint().apply(arg)
    this.x += -x
    this.y += -y
    this.width += 2 * x
    this.height += 2 * y
    return this
  }
  lerpX(value: number) {
    return this.x + this.width * value
  }
  lerpY(value: number) {
    return this.y + this.height * value
  }
  getPivotX(align: HorizontalAlign) {
    return this.lerpX(resolveAlign(align))
  }
  setPivotX(value: number, align: HorizontalAlign) {
    this.x += value - this.getPivotX(align)
    return this
  }
  getPivotY(align: VerticalAlign) {
    return this.lerpX(resolveAlign(align))
  }
  setPivotY(value: number, align: VerticalAlign) {
    this.y += value - this.getPivotY(align)
    return this
  }
  getPivot(align: SpaceAlign, out = new Point()) {
    const { x, y } = getTmpPoint().apply(align)
    out.x = this.lerpX(x)
    out.y = this.lerpY(y)
    return out
  }
  setPivot(align: SpaceAlign, value: Partial<Point>) {
    const {
      x: alignX,
      y: alignY,
    } = resolveSpaceAlign(align, getTmpPoint())
    const {
      x = this.lerpX(alignX),
      y = this.lerpY(alignY),
    } = value
    this.x += x - this.lerpX(alignX)
    this.y += y - this.lerpY(alignY)
    return this
  }
  getCenterX() { return this.x + this.width * .5 }
  setCenterX(value: number) {
    this.x = value - this.width * .5
    return this
  }
  getCenterY() { return this.y + this.width * .5 }
  setCenterY(value: number) {
    this.y = value - this.height * .5
    return this
  }
  getCenter() { return new Point().set(this.getCenterX(), this.getCenterY()) }
  setCenter({ x = 0, y = 0 }: Partial<Point>) {
    return this.setCenterX(x).setCenterY(y)
  }
  get left() { return this.x }
  get top() { return this.y }
  get right() { return this.x + this.width }
  get bottom() { return this.y + this.height }
  get centerX() { return this.getCenterX() }
  get centerY() { return this.getCenterY() }
  get center() { return this.getCenter() }
}
