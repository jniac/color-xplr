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
      document.body.querySelector('h1').style.color = color.clone().negate('hsl').toCss()
    },
    onDestroy: (hex, color) => {
      const negative = color.clone().negate('hsl').toCss()
      document.body.querySelector('.log').innerHTML += `<div style="color: ${negative}; background-color: ${hex}">color has changed: "${hex}"</div>`
    },
  })
})
