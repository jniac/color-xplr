import { onDirectTap, onKey } from './utils'
import { Root } from './root'
import { Point, Rect } from '../math'
import { ModalArg } from './types'

const getOuterRect = (arg: Window | HTMLElement, margin: number) => {
  if (arg instanceof Window) {
    return new Rect().set(0, 0, window.innerWidth, window.innerHeight).inflate(-margin)
  } else {
    const rect = arg.getBoundingClientRect()
    return new Rect().apply(rect).inflate(-margin)
  }
}

export const createModal = (app: Root, modal: ModalArg) => {
  const {
    source,
    container = document.body,
    outerRect: outerRectArg = window,
    outerMargin = 8,
    zIndex = 10,
    align = 'center'
  } = modal

  source.blur()

  const sourceRect = new Rect().apply(source.getBoundingClientRect()).inflate(10)

  const div = document.createElement('div')
  div.id = 'color-xplr-modal'
  div.style.zIndex = String(zIndex)
  div.append(app.div)
  container.append(div)

  const appRect = new Rect().apply(app.div.getBoundingClientRect())
  const alignPoint = new Point().apply(align)
  appRect.setPivot(alignPoint.clone().comp(), sourceRect.getPivot(alignPoint))
  appRect.moveInside(getOuterRect(outerRectArg, outerMargin))
  app.div.style.top = `${Math.round(appRect.top)}px`
  app.div.style.left = `${Math.round(appRect.left)}px`

  app.onDestroy(() => {
    div.remove()
  })

  app.bind(
    onDirectTap(div, () => {
      app.destroy()
    }),
    onKey('Escape', () => {
      app.updateColor(app.initialColor)
      app.destroy()
    }),
    onKey('Enter', () => {
      app.destroy()
    }),
  )  
}
