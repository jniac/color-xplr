// import { Color, ColorXplrMode, createColorXplr } from '@jniac/color-xplr'
import { createColorXplr } from '../../../lib/index.js'

/** @type {HTMLElement} */
const section = document.querySelector('.Section2')
const app = createColorXplr()

app.onChange(({ color }) => {
  section.style.backgroundColor = color.toCss()
})

section.append(app.element)
