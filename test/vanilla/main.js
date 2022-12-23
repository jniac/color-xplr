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

const colorInputs = [...document.querySelectorAll('.color-input')].map(div => {
  const input = div.querySelector('input')
  const label = div.querySelector('label')
  return { input, label }
})

for (const colorInput of colorInputs) {
  colorInput.input.addEventListener('click', event => {
    event.preventDefault()
    createColorXplr({
      color: colorInput.input.value,
      modal: {
        source: colorInput.input,
        align,
      },
      onChange: app => {
        const { hex, color } = app
        const oppositeHex = color.clone().opposite().toCss()
        for (const colorInput of colorInputs) {
          colorInput.input.value = hex
          colorInput.label.innerHTML = hex
        }
        document.body.style.backgroundColor = hex
        document.body.style.color = oppositeHex
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
}
