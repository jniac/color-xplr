import { createColorXplr, Color } from '../../lib/index.js'

const colorXplr = createColorXplr()
document.body.append(colorXplr.div)

const { color } = colorXplr
Object.assign(window, { Color, color })
