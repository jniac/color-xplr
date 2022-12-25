import { clamp01 } from '../math/utils'

export const computeEventXY = (event: PointerEvent, element: HTMLElement, margin = 0) => {
  const rect = element.getBoundingClientRect()
  const x = (event.clientX - rect.x - margin) / (rect.width - 2 * margin)
  const y = (event.clientY - rect.y - margin) / (rect.height - 2 * margin)
  return {
    x: clamp01(x),
    y: clamp01(y),
  }
}

export type HandlePointerInfo = {
  x: number
  y: number
}

export const handlePointer = (element: HTMLElement, margin: number, callback: (info: HandlePointerInfo) => void, {
  skip,
}: {
  skip?: (event: PointerEvent) => boolean,
} = {}) => {
  let isDown = false
  const onDown = (event: PointerEvent) => {
    if (skip?.(event)) {
      return
    }
    isDown = true
    event.preventDefault()
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    callback(computeEventXY(event, element, margin))
  }
  const onMove = (event: PointerEvent) => {
    callback(computeEventXY(event, element, margin))
  }
  const onUp = () => {
    isDown = false
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointermove', onUp)
  }
  element.addEventListener('pointerdown', onDown)
  const destroy = () => {    
    element.removeEventListener('pointerdown', onDown)
  }
  return {
    get isDown() { return isDown },
    destroy,
  }
}