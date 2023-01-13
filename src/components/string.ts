import { Color, ColorToStringMode, ColorToStringAlphaMode } from '../math/color'
import { Root } from '../main/root'
import { getBackgroundImage } from './utils'

const modes: ColorToStringMode[] = ['hex', 'rgb', 'hsl', 'glsl']
const MODE_STORE_KEY = 'color-to-string-mode'
const INCLUDE_ALPHA_STORE_KEY = 'color-to-string-include-alpha'

export const initString = (root: Root, div: HTMLDivElement) => {
  const input = div.querySelector('input') as HTMLInputElement
  const next = div.querySelector('.next') as HTMLDivElement
  const alpha = div.querySelector('.alpha') as HTMLDivElement
  const copy = div.querySelector('.copy') as HTMLDivElement
  div.style.backgroundImage = getBackgroundImage()
 
  const { color, updateColor } = root

  let includeAlpha: ColorToStringAlphaMode = root.store.get(INCLUDE_ALPHA_STORE_KEY) ?? 'always'
  let modeIndex = 0
  let mode: ColorToStringMode = root.store.get(MODE_STORE_KEY) ?? 'hex'

  next.onpointerdown = event => event.preventDefault()
  next.onclick = () => {
    modeIndex = (modeIndex + 1) % modes.length
    mode = modes[modeIndex]
    root.store.set(MODE_STORE_KEY, mode)
    update()
  }

  copy.onpointerdown = event => event.preventDefault()
  copy.onclick = () => {
    div.classList.add('flash')
    window.requestAnimationFrame(() => {
      div.classList.remove('flash')
      navigator.clipboard.writeText(input.value)
    })
  }

  alpha.onpointerdown = event => event.preventDefault()
  alpha.onclick = () => {
    includeAlpha = includeAlpha === 'always' ? 'auto' : 'always'
    root.store.set(INCLUDE_ALPHA_STORE_KEY, includeAlpha)
    update()
  }
  
  const update = () => {
    div.style.setProperty('--color', color.toGrayscale() > .5 ? 'black' : 'white')
    div.style.setProperty('--background-color', color.toHexString())
    div.style.setProperty('--font-size', mode === 'hex' ? '12px' : '8px')
    input.value = color.toString({ mode, includeAlpha })
    alpha.classList.toggle('dim', includeAlpha === 'auto' && color.a === 1)
    const [d1, d2, d3] = div.querySelectorAll('.background > *') as NodeListOf<HTMLDivElement>
    if (color.a < 1) {
      d1.style.opacity = '0'
      d3.style.backgroundColor = color.toHexString({ includeAlpha: 'never' })
    } else {
      d1.style.removeProperty('opacity')
      d3.style.removeProperty('background-color')
    }
  }

  input.addEventListener('input', () => {
    const str = input.value.replace('#', '')
    if (str.length === 6) {
      const newColor = new Color().fromHex(Number.parseInt(str, 16))
      updateColor(newColor)
    }
  })

  root.onUpdate(update)

  update()
}
