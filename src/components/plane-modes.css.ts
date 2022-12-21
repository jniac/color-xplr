export const planeModeCss = /* css */`
#color-xplr .plane .modes {
  --color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: .75em;
  color: var(--color);
  pointer-events: none;
}

#color-xplr .plane .modes:not(.right) {
  align-items: flex-start;
}

#color-xplr .plane .modes.right {
  align-items: flex-end;
}

#color-xplr .plane .modes .mode {
  user-select: none;
  pointer-events: all;
}

#color-xplr .plane .modes .mode + .mode {
  margin-top: 1px;
}

#color-xplr .plane .modes:not(.right) .mode {
  border-radius: 8px;
  padding: 0 6px 0 16px;
}

#color-xplr .plane .modes.right .mode {
  padding: 0 16px 0 6px;
}

#color-xplr .plane .modes .mode::after {
  --size: 7px;
  top: 5px;
  content: "";
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: var(--color);
  border-radius: 50%;
  transform: scale(.33);
}

#color-xplr .plane .modes .mode::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: .07;
  border-radius: 8px;
  background-color: var(--color);
}


#color-xplr .plane .modes:not(.right) .mode::after {
  left: 4px;
}

#color-xplr .plane .modes.right .mode::after {
  right: 4px;
}

#color-xplr .plane .modes .mode.selected {
  text-decoration: underline;
}

#color-xplr .plane .modes .mode.selected::after {
  transform: none;
}
#color-xplr .plane .modes .mode.selected::before {
  opacity: .15;
}

`