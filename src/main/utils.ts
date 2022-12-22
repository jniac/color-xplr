export const onDirectTap = (element: HTMLElement, callback: () => void) => {
  let downTime = -1
  const onPointerDown = () => {
    downTime = Date.now()
    element.addEventListener('pointerup', onPointerUp)
  }
  const onPointerUp = (event: PointerEvent): void => {
    const directTap = event.target === element && Date.now() - downTime < 500
    if (directTap) {
      callback()
    }
    element.removeEventListener('pointerup', onPointerUp)
  }
  element.addEventListener('pointerdown', onPointerDown)
  const destroy = () => {    
    element.removeEventListener('pointerdown', onPointerDown)
    element.removeEventListener('pointerup', onPointerUp)
  }
  return { destroy }
}

export const onKey = (key: string, callback: () => void) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      callback()
    }
  }
  document.addEventListener('keydown', onKeyDown)
  const destroy = () => {
    document.removeEventListener('keydown', onKeyDown)
  }
  return { destroy }
}
