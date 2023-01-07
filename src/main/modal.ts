import { onDirectTap, onKey } from './utils'
import { Root } from './root'
import { Point, Rect } from '../math'
import { ModalParams, modalParamsDefaults } from './types'

const getContainerRect = (arg: Window | HTMLElement, margin: number) => {
  if (arg instanceof Window) {
    return new Rect().set(0, 0, window.innerWidth, window.innerHeight).inflate(-margin)
  } else {
    const rect = arg.getBoundingClientRect()
    return new Rect().apply(rect).inflate(-margin)
  }
}

export const createModal = (app: Root, modal: ModalParams) => {
  const {
    source,
    sourceMargin = modalParamsDefaults.sourceMargin!,
    container = modalParamsDefaults.container!,
    containerRect: containerRectArg = container ?? modalParamsDefaults.containerRect,
    containerPadding = modalParamsDefaults.containerPadding!,
    zIndex = modalParamsDefaults.zIndex!,
    align = modalParamsDefaults.align!,
  } = modal

  const div = document.createElement('div')
  div.focus()
  div.id = 'color-xplr-modal'
  div.style.zIndex = String(zIndex)
  div.append(app.div)
  container.append(div)

  // Positioning:
  const containerRect = getContainerRect(containerRectArg, containerPadding)
  const sourceRect = new Rect()
  if (source) {
    sourceRect.apply(source.getBoundingClientRect())
  } else {
    sourceRect.set(containerRect.centerX, containerRect.centerY, 0, 0)
  }
  sourceRect.inflate(sourceMargin)
  const appRect = new Rect().apply(app.div.getBoundingClientRect())
  const alignPoint = new Point().apply(align)
  appRect.setPivot(alignPoint.clone().comp(), sourceRect.getPivot(alignPoint))
  appRect.moveInside(containerRect)
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
