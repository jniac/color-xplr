import { Point } from '../math'
import { InterpolationXY, PlaneMode } from '../main/type'

const planeModes = Object
  .values(PlaneMode)
  .filter(value => value !== PlaneMode.shift)

export const initPlaneModes = (div: HTMLDivElement, currentMode: PlaneMode) => {
  const modes = div.querySelector('.modes') as HTMLDivElement

  for (const mode of planeModes) {
    const div = document.createElement('div')
    div.className = 'mode'
    div.dataset.mode = mode
    div.innerHTML = mode
    modes.appendChild(div)
  }

  const update = (currentMode: PlaneMode, cursorCoords: Point, interpolateXY: InterpolationXY) => {
    const children = modes.children as any as HTMLDivElement[]
    for (const div of children) {
      const selected = div.dataset.mode === currentMode
      div.classList.toggle('selected', selected)
    }
    const right = cursorCoords.x < .25 && cursorCoords.y > .75
    if (right) {
      modes.classList.add('right')
    } else {
      modes.classList.remove('right')
    }
    const colorCss = interpolateXY(right ? .775 : .125, .875).toGrayscale() < .5 ? 'white' : 'black'
    modes.style.setProperty('--color', colorCss)
  }

  return {
    update,
  }
}
