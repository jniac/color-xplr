import { onDirectTap, onKey } from './utils'
import { Root } from './root'
import { CreateColorXplrArgs } from './create'

export const createModal = (app: Root, modal: NonNullable<CreateColorXplrArgs['modal']>) => {
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

  app.bind(
    onDirectTap(div, () => {
      app.destroy()
    }),
    onKey('Escape', () => {
      console.log('escape')
      app.updateColor(app.initialColor)
      app.destroy()
    }),
  )  
}
