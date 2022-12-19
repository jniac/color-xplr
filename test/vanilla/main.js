import { createColorXplr, Color } from '../../lib/index.js'

const colorXplr = createColorXplr()
document.body.append(colorXplr.div)

Object.assign(window, { Color })