import { initPlane } from '../components/plane'
import { initSlider, SliderMode } from '../components/slider'
import { initString } from '../components/string'
import { createStore } from '../core/store'
import { Color } from '../math'
import { html } from './html'
import { createModal } from './modal'
import { ColorXplrApp, Root } from './root'
import { css } from './style.css'
import { ColorXplrParams, StyleParams, colorXplrParamsDefaults } from './types'

const styleClassName = 'color-xplr-HDSL284H10LDK894'
/**
 * Create the root style element, only if not already there.
 */
const ensureStyleElement = () => {
  if (document.head.querySelector(`style.${styleClassName}`) === null) {
    const style = document.createElement('style')
    style.className = styleClassName
    style.innerHTML = css
    document.head.append(style)
  }
}

/**
 * Destroys (removes) the previously created style element (document.head).
 */
const destroyStyleElement = () => {
  document.head.querySelector(`style.${styleClassName}`)?.remove()
}

/**
 * Process the custom style params. 
 */
const processCustomStyle = (element: HTMLElement, styleParams: StyleParams) => {
  const ensureString = (
    value: number | string, 
    unit?: string, 
    unitRegExp = new RegExp(`${unit}$`),
  ) => {
    value = value.toString()
    if (unit && unitRegExp.test(value) === false) {
      value = `${value}${unit}`
    }
    return value
  }

  const {
    width,
    sliderHeight,
    backgroundColor,
    fontSize,
  } = styleParams ?? {}
  if (width) {
    element.style.setProperty('--width', ensureString(width, 'px'))
  }
  if (sliderHeight) {
    element.style.setProperty('--slider-height', ensureString(sliderHeight, 'px'))
  }
  if (backgroundColor) {
    element.style.setProperty('--background-color', ensureString(backgroundColor))
  }
  if (fontSize) {
    element.style.setProperty('--font-size', ensureString(fontSize, 'px', /px|em$/))
  }
}

/**
 * Create a Color Xplr dom element.
 * @public
 */
export const createColorXplr = ({
  modal,
  style,
  storeKey = colorXplrParamsDefaults.storeKey, 
  color: initialColorStr = colorXplrParamsDefaults.color, 
  mode = colorXplrParamsDefaults.mode,
  alpha = colorXplrParamsDefaults.alpha,
  removeStyleElementOnDestroy = colorXplrParamsDefaults.removeStyleElementOnDestroy,
  onChange,
  onFinish,
}: ColorXplrParams = {}): ColorXplrApp => {
  const store = createStore(storeKey)

  const div = document.createElement('div')
  div.innerHTML = html
  div.id = 'color-xplr'

  ensureStyleElement()

  if (style) {
    processCustomStyle(div, style)
  }

  const initialColor = new Color().from(initialColorStr ?? store.get('color') ?? '#e9e59a')
  const color = initialColor.clone()

  const updateColor = (newColor: Color) => {
    color.copy(newColor)
    update()
    store.set('color', newColor.toHex())
  }

  const root = new Root(div, store, initialColor, color, updateColor)
  root.onDestroy(() => {
    div.remove()
    if (removeStyleElementOnDestroy) {
      destroyStyleElement()
    }
  })

  const planeDiv = div.querySelector('.plane') as HTMLDivElement
  initPlane(root, planeDiv, mode)
  initSlider(root, SliderMode.hue, style?.sliderHeight)
  initSlider(root, SliderMode.luminosity, style?.sliderHeight)
  initSlider(root, SliderMode.saturation, style?.sliderHeight)
  initSlider(root, SliderMode.red, style?.sliderHeight)
  initSlider(root, SliderMode.green, style?.sliderHeight)
  initSlider(root, SliderMode.blue, style?.sliderHeight)
  if (alpha) {
    initSlider(root, SliderMode.alpha, style?.sliderHeight)
  }
  const stringDiv = div.querySelector('.string') as HTMLDivElement
  initString(root, stringDiv)

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
  app.onFinish(() => onFinish?.(app))

  return app
}
