import { createColorXplr } from '../../lib/index.js'

const input = document.querySelector('input') 
input.addEventListener('click', event => {
  event.preventDefault()
  createColorXplr({
    color: input.value,
    modal: {
      source: input,
    },
    onChange: app => {
      const hex = app.color.toCss()
      input.value = hex
      document.body.style.backgroundColor = hex
      document.body.querySelector('h1').style.color = app.color.clone().negate('hsl').toCss()
    },
    onDestroy: app => {
      if (app.colorHasChanged) {
        const hex = app.color.toCss()
        const negative = app.color.clone().negate('hsl').toCss()
        document.body.querySelector('.log').innerHTML += `<div style="color: ${negative}; background-color: ${hex}">color has changed: "${hex}"</div>`
      }
    },
  })
})
