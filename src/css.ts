export const css: string = /* css */ `
#color-xplr * {
  margin: 0;
  position: relative;
  box-sizing: border-box;
}

#color-xplr {
  --width: 300px;
  --padding: 4px;
  width: var(--width);
  padding: var(--padding);
  background-color: #eee;
  border-radius: 4px;
}

#color-xplr .colors {
  display: flex;
}

#color-xplr .colors canvas {
  width: calc(var(--width) - 2 * var(--padding));
}

#color-xplr .colors .plane {
  z-index: 1;
}

#color-xplr .colors .plane canvas {
  border-radius: 8px;
}

#color-xplr .colors .plane .cursor {
  --size: 16px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: solid 2px #fff;
  transform: translate(-50%, -50%);
}

#color-xplr .colors .range {
  display: flex;
  flex-direction: row;
  margin-top: 2px;
}

#color-xplr .colors .range canvas {
  --height: 16px;
  width: 0;
  height: var(--height);
  flex: 1;
  border-radius: calc(var(--height) / 2);
}

#color-xplr .colors .range .cursor {
  --size: 16px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: solid 2px #fff;
  transform: translate(-50%, 0);
}

#color-xplr .colors .range .cursor.pin {
  transform: translate(-50%, 0) scale(.66);
}
#color-xplr .colors .range .cursor span {
  user-select: none;
  font-size: .75em;
  transform: translate(2px, -2px);
}

#color-xplr .string {
  margin: var(--padding);
}
#color-xplr .string input {
  font-family: inherit;
  text-align: center;
  border: none;
  background-color: transparent;
}
`
