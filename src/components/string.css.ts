export const stringCss = /* css */`
#color-xplr .string {
  --color: white;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  color: var(--color);
  transition: filter .3s ease-out;
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
}

#color-xplr .string .copy {
  --size: 12px;
  position: absolute;
  top: calc(50% - var(--size) / 2);
  right: 16px;
  width: var(--size);
  height: var(--size);
  display: flex;
  cursor: pointer;
}

#color-xplr .string .copy svg {
  width: 100%;
  height: 100%;
  fill: var(--color);
  pointer-events: none;
}
`
