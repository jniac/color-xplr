import { css } from './style.css'
import { html } from './html'
import { Color } from './math/color'
import { createStore } from './store'
import { initRange } from './components/range'
import { initPlane } from './components/plane'
import { initString } from './components/string'

type CreateColorXplrArgs = Partial<{
  /** The key used for local storage of preferences. */
  storeKey: string
}>

const createColorXplr = ({ 
  storeKey = 'color-xplr'
}: CreateColorXplrArgs = {}) => {
  const store = createStore(storeKey)

  const div = document.createElement('div')
  div.innerHTML = html
  div.id = 'color-xplr'

  const style = document.createElement('style')
  style.innerHTML = css
  document.head.append(style)

  const color = new Color().setHex(store.get('color') ?? 0xffcc00)

  const updateColor = (newColor: Color) => {
    color.copy(newColor)
    update()
    store.set('color', newColor.toHex())
  }
  
  const planeDiv = div.querySelector('.plane') as HTMLDivElement
  const plane = initPlane(color, updateColor, planeDiv)
  const divs = [...div.querySelectorAll('.ranges > div')] as HTMLDivElement[]
  const rangeH = initRange(color, updateColor, divs.shift()!, 'hue')
  const rangeL = initRange(color, updateColor, divs.shift()!, 'luminosity')
  const rangeS = initRange(color, updateColor, divs.shift()!, 'saturation')
  const rangeR = initRange(color, updateColor, divs.shift()!, 'red')
  const rangeG = initRange(color, updateColor, divs.shift()!, 'green')
  const rangeB = initRange(color, updateColor, divs.shift()!, 'blue')
  const stringDiv = div.querySelector('.string') as HTMLDivElement
  const string = initString(color, updateColor, stringDiv, 'hex')
  
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

  let destroyed = false
  const destroy = () => {
    if (destroyed === false) {
      destroyed = true
      style.remove()
      div.remove()
    }
  }

  return {
    div,
    color,
    destroy,
  }
}

export {
  createColorXplr,
  Color,
}
