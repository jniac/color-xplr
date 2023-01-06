export const sliderCss = /* css */`

#color-xplr .sliders {
  margin-top: var(--padding);
}

#color-xplr .slider {
  display: flex;
  flex-direction: row;
}

#color-xplr .slider.hue canvas {
  border: solid 7px #ddd;
}

#color-xplr .slider + .slider {
  margin-top: 2px;
}

#color-xplr .slider canvas {
  width: 0;
  height: var(--slider-height);
  flex: 1;
  border-radius: calc(var(--slider-height) / 2);
  background-size: var(--slider-height);
  background-position: center;
}

#color-xplr .slider .cursor {
  position: absolute;
  width: var(--slider-height);
  height: var(--slider-height);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 2px #fff;
}
#color-xplr .slider.hue .cursor {
  transform: translate(-50%, 0);
}
#color-xplr .slider:not(.hue) .cursor {
  transform: translate(-50%, 0) scale(calc((16 - 2 * 2) / 16));
}

#color-xplr .slider .cursor span {
  display: flex;
  color: black;
  user-select: none;
  font-size: calc(var(--slider-height) * .666);
  font-weight: 800;
  opacity: .5;
}
`