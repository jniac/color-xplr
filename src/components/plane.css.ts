export const planeCss = /* css */`
#color-xplr .plane {
  z-index: 1;
  height: var(--inner-width);
}

#color-xplr .plane canvas {
  border-radius: 4px;
}

#color-xplr .plane .cursor {
  --size: 16px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: solid 2px #fff;
  transform: translate(-50%, -50%);
}
`