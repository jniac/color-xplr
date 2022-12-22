import { createColorXplr, Color } from '../../lib/index.js'

const input = document.querySelector('input') 
input.addEventListener('click', event => {
  event.preventDefault()
  createColorXplr({
    color: input.value,
    modal: {
      source: input,
    },
    onChange: (hex, color) => {
      input.value = hex
      document.body.style.backgroundColor = color.toCss()
    },
  })
})
