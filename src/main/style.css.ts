import { planeModeCss } from '../components/plane-modes.css'
import { planeCss } from '../components/plane.css'
import { sliderCss } from '../components/slider.css'
import { stringCss } from '../components/string.css'
import { styleParamsDefaults } from './types'

export const css: string = /* css */`
@import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap);
${planeModeCss}
${planeCss}
${sliderCss}
${stringCss}

#color-xplr {
  --font-size: ${styleParamsDefaults.fontSize}px;
  --width: ${styleParamsDefaults.width}px;
  --padding: 4px;
  --slider-height: ${styleParamsDefaults.sliderHeight}px;
  --background-color: ${styleParamsDefaults.backgroundColor};
  --inner-width: calc(var(--width) - 2 * var(--padding));
}

#color-xplr, #color-xplr * {
  position: relative;
  box-sizing: border-box;
}

#color-xplr * {
  margin: 0;
}

#color-xplr {
  width: var(--width);
  padding: var(--padding);
  background-color: var(--background-color);
  border-radius: var(--padding);
  font-family: 'Fira Code', monospace;
  /* Quite an hack: transform: scale(1) is here to force the html element to be rendered as a flat object, and prevent inner z-index to fight with outer elements. */
  transform: scale(1);
  font-size: var(--font-size);
}

#color-xplr .colors {
  display: flex;
  flex-direction: column;
}

#color-xplr .colors > * + * {
  margin-top: var(--padding);
}

#color-xplr canvas {
  width: var(--inner-width);
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
