export const stringCss = /* css */`
#color-xplr .string {
  --color: white;
  color: var(--color);
  transition: filter .3s ease-out;
}

#color-xplr .string.flash {
  filter: brightness(2) grayscale(.5);
  transition-duration: 0s;
}

#color-xplr .string input {
  color: var(--color);
}

#color-xplr .string .copy {
  --size: 16px;
  top: calc(50% - var(--size) / 2);
  right: 8px;
  width: var(--size);
  height: var(--size);
  position: absolute;
  cursor: pointer;
}

#color-xplr .string .copy svg {
  width: 100%;
  height: 100%;
  fill: var(--color);
  pointer-events: none;
}
`
