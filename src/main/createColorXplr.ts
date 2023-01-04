import { initPlane } from '../components/plane'
import { initSlider } from '../components/slider'
import { initString } from '../components/string'
import { createStore } from '../core/store'
import { Color } from '../math'
import { html } from './html'
import { createModal } from './modal'
import { ColorXplrApp, Root } from './root'
import { css } from './style.css'
import { CreateColorXplrArgs, StyleSettigns, PlaneMode } from './types'

const processStyleSettings = (element: HTMLElement, settings: StyleSettigns) => {
  const ensureString = (value: number | string, unit: string) => {
    value = value.toString()
    if (value.endsWith(unit) === false) {
      value = `${value}px`
    }
    return value
  }
  const {
    sliderHeight,
  } = settings ?? {}
  if (sliderHeight) {
    element.style.setProperty('--slider-height', ensureString(sliderHeight, 'px'))
  }
}

/**
 * Create a Color Xplr dom element.
 * @public
 */
export const createColorXplr = ({
  storeKey = 'color-xplr', 
  color: initialColorStr, 
  modal,
  mode = PlaneMode.hue,
  onChange,
  onDestroy,
  settings,
}: CreateColorXplrArgs = {}): ColorXplrApp => {
  const store = createStore(storeKey)

  const div = document.createElement('div')
  div.innerHTML = html
  div.id = 'color-xplr'

  if (settings) {
    processStyleSettings(div, settings)
  }  

  const style = document.createElement('style')
  style.innerHTML = css
  document.head.append(style)

  const initialColor = new Color().from(initialColorStr ?? store.get('color') ?? '#e9e59a')
  const color = initialColor.clone()

  const updateColor = (newColor: Color) => {
    color.copy(newColor)
    update()
    store.set('color', newColor.toHex())
  }

  const root = new Root(div, store, initialColor, color, updateColor)
  root.onDestroy(() => {
    style.remove()
    div.remove()
  })

  const planeDiv = div.querySelector('.plane') as HTMLDivElement
  initPlane(root, planeDiv, mode)
  const divs = [...div.querySelectorAll('.sliders > .slider')] as HTMLDivElement[]
  initSlider(root, divs.shift()!, 'hue')
  initSlider(root, divs.shift()!, 'luminosity')
  initSlider(root, divs.shift()!, 'saturation')
  initSlider(root, divs.shift()!, 'red')
  initSlider(root, divs.shift()!, 'green')
  initSlider(root, divs.shift()!, 'blue')
  const stringDiv = div.querySelector('.string') as HTMLDivElement
  initString(root, stringDiv, 'hex')

  const update = () => {
    root.call('update', true)
  }

  update()
  window.requestAnimationFrame(update)

  if (modal) {
    createModal(root, modal)
  }

  const app = new ColorXplrApp(div, initialColor, color)
  root.add(app)
  app.onUpdate(() => onChange?.(app))
  app.onDestroy(() => onDestroy?.(app))

  return app
}
