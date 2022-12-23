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
      const { hex } = app
      input.value = hex
      document.body.style.backgroundColor = hex
      const oppositeHex = app.color.clone().opposite().toCss()
      document.body.querySelector('h1').style.color = oppositeHex
      document.body.querySelector('label').innerHTML = hex
      document.body.querySelector('label').style.color = oppositeHex
    },
    onDestroy: app => {
      if (app.colorHasChanged) {
        const { hex, color } = app
        const negative = color.clone().opposite().toCss()
        document.body.querySelector('.log').innerHTML += `<div style="color: ${negative}; background-color: ${hex}">color has changed: "${hex}"</div>`
      }
    },
  })
})
