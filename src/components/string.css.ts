export const stringCss = /* css */`
#color-xplr .string {
  --color: white;
  --background-color: black;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  color: var(--color);
  transition: filter .3s ease-out;
  background-size: var(--slider-height);
  background-position: center;
}

#color-xplr .string .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
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
  padding: 32px 0;
  color: var(--color);
  font-size: 9px;
}

#color-xplr .string .btn {
  --size: 12px;
  position: absolute;
  top: calc(50% - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  display: flex;
  cursor: pointer;
}

#color-xplr .string .next {
  left: 8px;
}

#color-xplr .string .copy {
  right: 8px;
}

#color-xplr .string .btn svg {
  width: 100%;
  height: 100%;
  fill: var(--color);
  pointer-events: none;
}
`
