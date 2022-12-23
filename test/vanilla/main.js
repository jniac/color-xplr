import { createColorXplr } from '../../lib/index.js'

let align = 'left'

const initSelect = () => {
  const select = document.querySelector('select')
  select.innerHTML = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ].map(str => `<option value="${str}">${str}</option>`).join('\n')
  for (const option of select.querySelectorAll('option')) {
    option.selected = option.value === align
  }
  select.onchange = () => {
    align = select.value
  }
}
initSelect()

const input = document.querySelector('input') 
input.addEventListener('click', event => {
  event.preventDefault()
  createColorXplr({
    color: input.value,
    modal: {
      source: input,
      align,
    },
    onChange: app => {
      const { hex, color } = app
      const oppositeHex = color.clone().opposite().toCss()
      input.value = hex
      document.body.style.backgroundColor = hex
      document.body.style.color = oppositeHex
      document.body.querySelector('label').innerHTML = hex
    },
    onDestroy: app => {
      if (app.colorHasChanged) {
        const { hex, color } = app
        const oppositeHex = color.clone().opposite().toCss()
        document.body.querySelector('.log').innerHTML += `<div style="color: ${oppositeHex}; background-color: ${hex}">color has changed: "${hex}"</div>`
      }
    },
  })
})
