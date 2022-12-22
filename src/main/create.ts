import { css } from './style.css'
import { html } from './html'
import { Color } from '../math/color'
import { createStore } from '../core/store'
import { initRange } from '../components/range'
import { initPlane } from '../components/plane'
import { initString } from '../components/string'
import { onDirectTap } from './utils'
import { ColorXplrApp, Root } from './root'

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
  }
  color: string
  onChange: (hexString: string, color: Color) => void
  onDestroy: (hexString: string, color: Color) => void
}>

const createModal = (app: Root, modal: NonNullable<CreateColorXplrArgs['modal']>) => {
  const {
    container = document.body, zIndex = 10,
  } = modal

  const div = document.createElement('div')
  div.id = 'color-xplr-modal'
  div.style.zIndex = String(zIndex)
  div.append(app.div)
  container.append(div)

  app.onDestroy(() => {
    div.remove()
  })

  onDirectTap(div, () => {
    app.destroy()
  })
}

/**
 * Create a Color Xplr dom element.
 * @public
 */
export const createColorXplr = ({
  storeKey = 'color-xplr', 
  color: initialColor, 
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

  const color = new Color().set(initialColor ?? store.get('color') ?? '#e9e59a')

  const updateColor = (newColor: Color) => {
    color.copy(newColor)
    update()
    store.set('color', newColor.toHex())
  }

  const root = new Root(div, color, store, updateColor)
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

  const app = new ColorXplrApp(color)
  root.add(app)
  app.onUpdate(() => onChange?.(color.toCss(), color))
  app.onDestroy(() => onDestroy?.(color.toCss(), color))

  return app
}
