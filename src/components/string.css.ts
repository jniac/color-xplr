export const stringCss = /* css */`
#color-xplr .string {
  --color: white;
  --background-color: black;
  --height: 80px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  color: var(--color);
  transition: filter .3s ease-out;
  background-size: var(--slider-height);
  background-position: center;
  overflow: hidden;
}

#color-xplr .string .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

#color-xplr .string .background > div {
  flex: 0 0 calc(var(--height) / 2);
  background-color: var(--background-color);
  transition: opacity .3s ease-out;
}

#color-xplr .string .background > .middle {
  flex: 1;
}

#color-xplr .string.flash {
  filter: brightness(2) grayscale(.5);
  transition-duration: 0s;
}

#color-xplr .string input {
  font-family: inherit;
  text-align: center;
  border: none;
  background-color: transparent;
  height: 80px;
  color: var(--color);
  font-size: inherit;
}

#color-xplr .string .abs {
  --size-horz: 18px;
  --size-vert: 32px;
  position: absolute;
  display: flex;
  top: calc(50% - var(--size-vert) / 2);
}

/* #color-xplr .string .abs > * + * {
  margin-left: 2px;
} */

#color-xplr .string .abs.left {
  left: 5px;
}

#color-xplr .string .abs.right {
  right: 5px;
}
#color-xplr .string .btn {
  padding: 2px;
}
#color-xplr .string .btn.alpha {
  padding: 5px;
}
#color-xplr .string .btn.alpha.dim {
  opacity: .5;
}
#color-xplr .string .btn.alpha.dim > * {
  transform: scale(.8);
}

#color-xplr .string .btn {
  width: var(--size-horz);
  height: var(--size-vert);
  display: flex;
  cursor: pointer;
}

#color-xplr .string .btn svg {
  width: 100%;
  height: 100%;
  fill: var(--color);
  pointer-events: none;
}
`
