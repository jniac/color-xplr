import { createColorXplr } from '@jniac/color-xplr'

/** @type {HTMLElement} */
const section = document.querySelector('.Section2')
const app = createColorXplr()

app.onChange(({ color }) => {
  section.style.backgroundColor = color.toCss()
})

section.append(app.element)
