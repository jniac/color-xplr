import { planeModeCss } from './components/plane-modes.css'
import { planeCss } from './components/plane.css'

export const css: string = /* css */ `
${planeModeCss}
${planeCss}

#color-xplr * {
  margin: 0;
  position: relative;
  box-sizing: border-box;
}

#color-xplr {
  --width: 300px;
  --padding: 4px;
  --inner-width: calc(var(--width) - 2 * var(--padding));
  width: var(--width);
  padding: var(--padding);
  background-color: #eee;
  border-radius: 4px;
}

#color-xplr .colors {
  display: flex;
}

#color-xplr canvas {
  width: var(--inner-width);
}

#color-xplr .ranges {
  margin-top: var(--padding);
}

#color-xplr .range {
  display: flex;
  flex-direction: row;
}

#color-xplr .range + .range {
  margin-top: 2px;
}

#color-xplr .range canvas {
  --height: 16px;
  width: 0;
  height: var(--height);
  flex: 1;
  border-radius: calc(var(--height) / 2);
}

#color-xplr .range .cursor {
  --size: 16px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: solid 2px #fff;
  transform: translate(-50%, 0);
}

#color-xplr .range .cursor.pin {
  transform: translate(-50%, 0) scale(.66);
}

#color-xplr .range .cursor span {
  user-select: none;
  font-size: .66em;
  font-weight: 500;
  transform: translate(3px, -1px);
  opacity: .5;
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
`
