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

/**
 * Generate a checker in svg for element.style.backgroundImage assigment.
 */
export const getBackgroundImage = (colorA = '#bbb', colorB = '#ddd') => {
  const svg = `
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <rect fill="${colorB}" width="20" height="20"></rect>
      <path fill="${colorA}" d="M0,0L10,0L10,10L0,10Z M10,10L20,10L20,20L10,20Z"></path>
    </svg>
  `.replace(/\s+/g, ' ')
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}`
}
