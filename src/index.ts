import { css } from './style.css'
import { html } from './html'
import { Color } from './math/color'
import { createStore } from './store'
import { initRange } from './components/range'
import { initPlane } from './components/plane'
import { initString } from './components/string'
import { ColorXplrApp } from './type'

type CreateColorXplrArgs = Partial<{
  /** The key used for local storage of preferences. */
  storeKey: string
  modal: {
    source: HTMLElement
    container?: HTMLElement
    zIndex?: number
  }
  color: string
  onChange: (hexString: string, color: Color) => void,
}>

const createColorXplr = ({ 
  storeKey = 'color-xplr',
  color: initialColor,
  modal,
  onChange,
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
    onChange?.(newColor.toCss(), color)
  }
  
  let destroyed = false
  const destroy = () => {
    if (destroyed === false) {
      destroyed = true
      style.remove()
      div.remove()
    }
  }

  const app: ColorXplrApp = Object.freeze({
    div,
    color,
    updateColor,
    store,
    destroy,
    get destroyed() { return destroyed },
  })

  const planeDiv = div.querySelector('.plane') as HTMLDivElement
  const plane = initPlane(app, planeDiv)
  const divs = [...div.querySelectorAll('.ranges > div')] as HTMLDivElement[]
  const rangeH = initRange(app, divs.shift()!, 'hue')
  const rangeL = initRange(app, divs.shift()!, 'luminosity')
  const rangeS = initRange(app, divs.shift()!, 'saturation')
  const rangeR = initRange(app, divs.shift()!, 'red')
  const rangeG = initRange(app, divs.shift()!, 'green')
  const rangeB = initRange(app, divs.shift()!, 'blue')
  const stringDiv = div.querySelector('.string') as HTMLDivElement
  const string = initString(app, stringDiv, 'hex')
  
  const update = () => {
    plane.update()
    rangeH.update()
    rangeR.update()
    rangeG.update()
    rangeB.update()
    rangeL.update()
    rangeS.update()
    string.update()
  }

  update()
  window.requestAnimationFrame(update)

  if (modal) {
    createModal(app, modal)
  }

  return app
}

const createModal = (app: ColorXplrApp, modal: NonNullable<CreateColorXplrArgs['modal']>) => {

  const {
    container = document.body,
    zIndex = 10,
  } = modal

  const div = document.createElement('div')
  div.id = 'color-xplr-modal'
  div.style.zIndex = String(zIndex)
  div.append(app.div)
  container.append(div)
}

export {
  createColorXplr,
  Color,
}
