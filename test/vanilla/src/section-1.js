import { Color, ColorXplrMode, createColorXplr } from '@jniac/color-xplr'
import { initAlignSelect, initModeSelect } from './init-select.js'

Object.assign(window, { Color, createColorXplr })

let align = 'left'
let mode = ColorXplrMode.blue

initAlignSelect(align, value => align = value)
initModeSelect(mode, value => mode = value)

const colorInputs = [...document.querySelectorAll('.ColorInput')].map(div => {
  const input = div.querySelector('input')
  const label = div.querySelector('label')
  return { input, label }
})

const updateColor = (hex, oppositeHex) => {
  for (const colorInput of colorInputs) {
    colorInput.input.value = hex
    colorInput.label.innerHTML = hex
  }
  document.body.style.backgroundColor = hex
  document.body.style.color = oppositeHex
}

updateColor('#a6eedd', new Color().fromCss('#a6eedd').opposite().toCss())

for (const colorInput of colorInputs) {
  colorInput.input.addEventListener('click', event => {
    event.preventDefault()
    colorInput.input.blur()
    createColorXplr({
      color: colorInput.input.value,
      mode,
      useAlpha: document.querySelector('input[name=useAlpha]').checked,
      modal: {
        source: colorInput.input,
        align,
      },
      ...colorInput.input.dataset,
      onChange: app => {
        const { hex, color } = app
        const oppositeHex = color.clone().opposite().toCss()
        updateColor(hex, oppositeHex)
      },
      onFinish: app => {
        if (app.colorHasChanged) {
          const { hex, color } = app
          const oppositeHex = color.clone().opposite().toCss()
          document.body.querySelector('.log').innerHTML += `<div style="color: ${oppositeHex}; background-color: ${hex}">color has changed: "${hex}"</div>`
        }
      },
    })
  })
}

setTimeout(() => {
  document.querySelector('.Loading').classList.add('hidden')
}, 400)
