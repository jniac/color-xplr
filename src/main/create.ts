import { initPlane } from '../components/plane'
import { initRange } from '../components/range'
import { initString } from '../components/string'
import { createStore } from '../core/store'
import { Color, SpaceAlign } from '../math'
import { html } from './html'
import { createModal } from './modal'
import { ColorXplrApp, Root } from './root'
import { css } from './style.css'

/**
 * @public
 */
export type CreateColorXplrArgs = Partial<{
  /** The key used for local storage of preferences. */
  storeKey: string
  modal: {
    source: HTMLElement
    container?: HTMLElement
    zIndex?: number
    align?: SpaceAlign
  }
  color: string
  onChange: (app: ColorXplrApp) => void
  onDestroy: (app: ColorXplrApp) => void
}>

/**
 * Create a Color Xplr dom element.
 * @public
 */
export const createColorXplr = ({
  storeKey = 'color-xplr', 
  color: initialColorStr, 
  modal, 
  onChange,
  onDestroy,
}: CreateColorXplrArgs = {}): ColorXplrApp => {
  const store = createStore(storeKey)

  const div = document.createElement('div')
  div.innerHTML = html
  div.id = 'color-xplr'

  const style = document.createElement('style')
  style.innerHTML = css
  document.head.append(style)

  const initialColor = new Color().set(initialColorStr ?? store.get('color') ?? '#e9e59a')
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
  initPlane(root, planeDiv)
  const divs = [...div.querySelectorAll('.ranges > div')] as HTMLDivElement[]
  initRange(root, divs.shift()!, 'hue')
  initRange(root, divs.shift()!, 'luminosity')
  initRange(root, divs.shift()!, 'saturation')
  initRange(root, divs.shift()!, 'red')
  initRange(root, divs.shift()!, 'green')
  initRange(root, divs.shift()!, 'blue')
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

  const app = new ColorXplrApp(initialColor, color)
  root.add(app)
  app.onUpdate(() => onChange?.(app))
  app.onDestroy(() => onDestroy?.(app))

  return app
}
