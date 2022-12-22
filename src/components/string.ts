import { Color } from '../math/color'
import { Root } from '../main/root'

type StringMode = 'hex' | 'rgb'

export const initString = (root: Root, div: HTMLDivElement, mode: StringMode) => {
  const input = div.querySelector('input') as HTMLInputElement
  const copy = div.querySelector('.copy') as HTMLDivElement
 
  const { color, updateColor } = root

  copy.onclick = () => {
    div.classList.add('flash')
    window.requestAnimationFrame(() => {
      div.classList.remove('flash')
      navigator.clipboard.writeText(color.toCss())
    })
  }
  
  const update = () => {
    div.style.setProperty('--color', color.toGrayscale() > .5 ? 'black' : 'white')
    input.value = color.toCss()
    div.style.backgroundColor = color.toCss()
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
