import { Color } from '../math/color'
import { ColorXplrApp } from '../type'

type StringMode = 'hex' | 'rgb'

export const initString = (app: ColorXplrApp, div: HTMLDivElement, mode: StringMode) => {
  const input = div.querySelector('input') as HTMLInputElement
 
  const { color, updateColor } = app
  
  const update = () => {
    input.value = color.toCss()
    input.style.color = color.toGrayscale() > .5 ? 'black' : 'white'
    div.style.backgroundColor = color.toCss()
  }

  input.addEventListener('input', () => {
    const str = input.value.replace('#', '')
    if (str.length === 6) {
      const newColor = new Color().setHex(Number.parseInt(str, 16))
      updateColor(newColor)
    }
  })

  return {
    update,
  }
}
