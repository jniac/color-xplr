import { Point } from '../math'

const planeModes = ['hue', 'red', 'green', 'blue', 'comp'] as const
export type PlaneMode = (typeof planeModes)[number]

export const initPlaneModes = (div: HTMLDivElement, currentMode: PlaneMode) => {
  const modes = div.querySelector('.modes') as HTMLDivElement

  for (const mode of planeModes) {
    const div = document.createElement('div')
    div.className = 'mode'
    div.dataset.mode = mode
    div.innerHTML = mode
    modes.appendChild(div)
  }

  const update = (currentMode: PlaneMode, cursorCoords: Point) => {
    const children = modes.children as any as HTMLDivElement[]
    for (const div of children) {
      const selected = div.dataset.mode === currentMode
      div.classList.toggle('selected', selected)
    }
    if (cursorCoords.x < .25 && cursorCoords.y > .75) {
      modes.classList.add('right')
    }
    if (cursorCoords.x > .75 && cursorCoords.y > .75) {
      modes.classList.remove('right')
    }
  }

  return {
    update,
  }
}
