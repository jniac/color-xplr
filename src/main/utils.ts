export const onDirectTap = (element: HTMLElement, callback: () => void) => {
  let downTime = -1
  element.addEventListener('pointerdown', () => {
    downTime = Date.now()
  })
  element.addEventListener('pointerup', event => {
    const directTap = event.target === element && Date.now() - downTime < 500
    if (directTap) {
      callback()
    }
  })
}