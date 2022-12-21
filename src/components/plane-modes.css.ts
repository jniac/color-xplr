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
  border-radius: 8px;
  padding: 0 16px 0 6px;
}

#color-xplr .plane .modes .mode::before {
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


#color-xplr .plane .modes:not(.right) .mode::before {
  left: 4px;
}

#color-xplr .plane .modes.right .mode::before {
  right: 4px;
}

#color-xplr .plane .modes .mode:not(.selected) {
  background-color: #fff1;
}
#color-xplr .plane .modes .mode.selected {
  text-decoration: underline;
  background-color: #fff2;
}

#color-xplr .plane .modes .mode.selected::before {
  transform: none;
}
`