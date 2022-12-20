export const rangeCss = /* css */`

#color-xplr .ranges {
  margin-top: var(--padding);
}

#color-xplr .range {
  display: flex;
  flex-direction: row;
}

#color-xplr .range.hue canvas {
  border: solid 6.5px #ddd;
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
`