import { Color } from '../math/color'

type StringMode = 'hex' | 'rgb'

export const initString = (color: Color, updateColor: (newColor: Color) => void, div: HTMLDivElement, mode: StringMode) => {
  const input = div.querySelector('input') as HTMLInputElement
  
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
