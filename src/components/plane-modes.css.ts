export const planeModeCss = /* css */`
#color-xplr .plane .modes {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-size: .75em;
  color: white;
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

#color-xplr .plane .modes:not(.right) .mode {
  padding-left: 12px;
}

#color-xplr .plane .modes.right .mode {
  padding-right: 12px;
}

#color-xplr .plane .modes .mode::before {
  --size: 7px;
  top: 5px;
  content: "";
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-color: white;
  border-radius: 50%;
  transform: scale(.5);
}


#color-xplr .plane .modes:not(.right) .mode::before {
  left: 0px;
}

#color-xplr .plane .modes.right .mode::before {
  right: 0px;
}


#color-xplr .plane .modes .mode.selected::before {
  transform: none;
}
`