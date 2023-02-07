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

  const copyToClipboard = () => {
    div.classList.add('flash')
    window.requestAnimationFrame(() => {
      div.classList.remove('flash')
      navigator.clipboard.writeText(input.value)
    })
  }
  div.addEventListener('copy-to-clipboard', () => copyToClipboard())

  copy.onpointerdown = event => event.preventDefault()
  copy.onclick = () => {
    div.dispatchEvent(new CustomEvent('copy-to-clipboard'))
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
    div.style.setProperty('font-size', mode === 'hex' ? '1em' : '.66em')
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
    try {
      // NOTE: on "input" events we update the value OOONNNLLYYYY if the two 
      // string are strictly identical, otherwise it break the usage by rewriting
      // new color string when the current edited value match a valid potential 
      // color declaration.
      const newColor = new Color().parse(input.value)
      const stringsAreTheSame = input.value === newColor.toString({ mode, includeAlpha })
      if (stringsAreTheSame) {
        updateColor(newColor)
      }
    } catch(error) {
      // it's ok
    }
  })

  input.addEventListener('change', () => {
    try {
      const newColor = new Color().parse(input.value)
      updateColor(newColor)
    } catch(error) {
      // it's ok
    }
  })

  root.onUpdate(update)

  update()
}
