import { Color, ColorToStringMode } from '../math/color'
import { Root } from '../main/root'
import { getBackgroundImage } from './utils'

type StringMode = 'hex' | 'rgb'

export const initString = (root: Root, div: HTMLDivElement, mode: StringMode) => {
  const input = div.querySelector('input') as HTMLInputElement
  const next = div.querySelector('.next') as HTMLDivElement
  const copy = div.querySelector('.copy') as HTMLDivElement
  div.style.backgroundImage = getBackgroundImage()
 
  const { color, updateColor } = root

  let modeIndex = 0
  const modes: ColorToStringMode[] = ['hex', 'rgb', 'hsl', 'glsl']

  next.onclick = () => {
    modeIndex = (modeIndex + 1) % modes.length
    input.value = color.toString({ mode: modes[modeIndex] })
  }

  copy.onclick = () => {
    div.classList.add('flash')
    window.requestAnimationFrame(() => {
      div.classList.remove('flash')
      navigator.clipboard.writeText(color.toCss())
    })
  }
  
  const update = () => {
    div.style.setProperty('--color', color.toGrayscale() > .5 ? 'black' : 'white')
    div.style.setProperty('--background-color', color.toHexString()) 
    input.value = color.toString({ mode: modes[modeIndex] })
  }

  input.addEventListener('input', () => {
    const str = input.value.replace('#', '')
    if (str.length === 6) {
      const newColor = new Color().fromHex(Number.parseInt(str, 16))
      updateColor(newColor)
    }
  })

  root.onUpdate(update)
}
