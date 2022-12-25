
export const initSelect = (initialAign, onChange) => {
  let align = initialAign
  const select = document.querySelector('select')
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

