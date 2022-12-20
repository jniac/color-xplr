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

#color-xplr canvas {
  width: calc(var(--width) - 2 * var(--padding));
}

#color-xplr .plane {
  z-index: 1;
}

#color-xplr .plane canvas {
  border-radius: 4px;
}

#color-xplr .plane .modes {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
#color-xplr .plane .modes::before {
  --size: 8px;
  content: "";
  position: absolute;
  top: 0;
  width: var(--size);
  height: var(--size);
  border-left: solid 2px white;
  border-top: solid 2px white;
  transform: rotate(-135deg);
}

#color-xplr .plane .cursor {
  --size: 16px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: solid 2px #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
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
  font-size: .75em;
  transform: translate(2px, -2px);
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
