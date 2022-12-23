import { onDirectTap, onKey } from './utils'
import { Root } from './root'
import { CreateColorXplrArgs } from './create'
import { Point, Rect } from '../math'

export const createModal = (app: Root, modal: NonNullable<CreateColorXplrArgs['modal']>) => {
  const {
    source,
    container = document.body, 
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
