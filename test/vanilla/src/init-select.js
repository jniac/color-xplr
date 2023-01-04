import { ColorXplrMode } from '@jniac/color-xplr'

export const initAlignSelect = (initialAlign, onChange) => {
  let align = initialAlign
  const select = document.querySelector('.ModalAlign select')
  select.innerHTML = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ].map(str => `<option value="${str}">${str}</option>`).join('\n')
  for (const option of select.querySelectorAll('option')) {
    option.selected = option.value === align
  }
  select.onchange = () => {
    onChange(select.value)
  }
}

export const initModeSelect = (initialMode, onChange) => {
  let mode = initialMode
  const select = document.querySelector('.ColorMode select')
  select.innerHTML = Object.values(Object.values(ColorXplrMode)).map(str => `<option value="${str}">${str}</option>`).join('\n')
  for (const option of select.querySelectorAll('option')) {
    option.selected = option.value === mode
  }
  select.onchange = () => {
    onChange(select.value)
  }
}

