import { planeModeCss } from '../components/plane-modes.css'
import { planeCss } from '../components/plane.css'
import { rangeCss } from '../components/range.css'
import { stringCss } from '../components/string.css'

export const css: string = /* css */`
@import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap);
${planeModeCss}
${planeCss}
${rangeCss}
${stringCss}

#color-xplr, #color-xplr * {
  margin: 0;
  position: relative;
  box-sizing: border-box;
}

#color-xplr {
  --width: 240px;
  --padding: 4px;
  --inner-width: calc(var(--width) - 2 * var(--padding));
  width: var(--width);
  padding: var(--padding);
  background-color: #eee;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

#color-xplr .colors {
  display: flex;
  flex-direction: column;
}

#color-xplr canvas {
  width: var(--inner-width);
}

#color-xplr .string {
  margin-top: var(--padding);
  border-radius: 4px;
}

#color-xplr .string input {
  font-family: inherit;
  text-align: center;
  border: none;
  background-color: transparent;
  padding: 32px 0;
}

#color-xplr-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

#color-xplr-modal > #color-xplr {
  position: fixed;
  box-shadow: #0003 8px 8px 16px;
}
`
