import { Color, createColorXplr } from '@jniac/color-xplr'
import { initSelect } from './init-select.js'

Object.assign(window, { Color, createColorXplr })

let align = 'left'

initSelect(align, value => align = value)

const colorInputs = [...document.querySelectorAll('.color-input')].map(div => {
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

updateColor('#b3c8dd', new Color().fromCss('#b3c8dd').opposite().toCss())

for (const colorInput of colorInputs) {
  colorInput.input.addEventListener('click', event => {
    event.preventDefault()
    colorInput.input.blur()
    createColorXplr({
      color: colorInput.input.value,
      modal: {
        source: colorInput.input,
        align,
      },
      onChange: app => {
        const { hex, color } = app
        const oppositeHex = color.clone().opposite().toCss()
        updateColor(hex, oppositeHex)
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

setTimeout(() => {
  document.querySelector('.Loading').classList.add('hidden')
}, 400)
