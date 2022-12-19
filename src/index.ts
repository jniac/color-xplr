import { css } from './css'
import { html } from './html'
import { Color } from './math/color'
import { initRange } from './components/range'
import { initPlane } from './components/plane'
import { initString } from './components/string'

const createColorXplr = () => {
  const div = document.createElement('div')
  div.innerHTML = html
  div.id = 'color-xplr'

  const style = document.createElement('style')
  style.innerHTML = css
  document.head.append(style)

  const color = new Color().setHex(0xffcc00)

  const updateColor = (newColor: Color) => {
    color.copy(newColor)
    update()
  }

  const [div1, div2, div3, div4, div5, div6, div7] = div.querySelectorAll('.colors > div') as any as HTMLDivElement[]
  const plane = initPlane(color, updateColor, div1)
  const rangeH = initRange(color, updateColor, div2, 'hue')
  const rangeR = initRange(color, updateColor, div3, 'red')
  const rangeG = initRange(color, updateColor, div4, 'green')
  const rangeB = initRange(color, updateColor, div5, 'blue')
  const rangeL = initRange(color, updateColor, div6, 'luminosity')
  const rangeS = initRange(color, updateColor, div7, 'saturation')
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
    destroy,
  }
}

export {
  createColorXplr,
  Color,
}
