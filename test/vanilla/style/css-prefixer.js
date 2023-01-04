/**
 * @typedef {Object} Replacer
 * @property {(pattern: string) => string} selector - selector replacer
 * @property {(pattern: string) => string} style - selector replacer
 * @property {(pattern: string) => string} comment - comment replacer
 *
 * Transform a "CSS" string through 3 kinds of match:
 * - "selector" (useful for prefix / transform selectors)
 * - "style" (the group of properties attached to a selector)
 * - "comment" (css comments)
 * @param {string} str
 * @param {Replacer} replacer
 */
const transformCSS = (str, replacer) => {
  let index = -1
  let lastEndIndex = 0
  let bracketIndex = -1
  let commentIndex = -1
  let selectorIndex = -1
  let transformedStr = ''

  /**
   * @param {number} startIndex
   * @param {number} endIndex
   * @param {string} insert
   */
  const replace = (startIndex, endIndex, insert) => {
    transformedStr += str.slice(lastEndIndex, startIndex) + insert
    lastEndIndex = endIndex
  }

  const {
    comment: commentReplacer,
    selector: selectorReplacer,
    style: styleReplacer,
  } = replacer

  while (++index < str.length) {
    const char = str[index]
    const nextChar = str[index + 1]

    if (/\s/.test(char)) {
      continue
    }

    if (char === '{') {
      if (selectorIndex !== -1) {
        if (selectorReplacer) {
          const endIndex = index
          const match = str.slice(selectorIndex, endIndex)
          replace(selectorIndex, endIndex, selectorReplacer(match))
        }
        selectorIndex = -1
      }

      bracketIndex = index
      continue
    }

    if (char === '}') {
      if (styleReplacer) {
        const endIndex = index + 1
        const match = str.slice(bracketIndex, endIndex)
        replace(bracketIndex, endIndex, styleReplacer(match))
      }
      bracketIndex = -1
      continue
    }

    if (char === '/' && nextChar === '*') {
      commentIndex = index
      continue
    }

    if (char === '*' && nextChar === '/') {
      index++ // move forward
      if (commentReplacer) {
        const endIndex = index + 1
        const match = str.slice(commentIndex, endIndex)
        replace(commentIndex, endIndex, commentReplacer(match))
      }
      commentIndex = -1
      continue
    }

    if (bracketIndex === -1 && commentIndex === -1 && selectorIndex === -1) {
      selectorIndex = index
    }
  }

  transformedStr += str.slice(lastEndIndex)

  return transformedStr
}

// Why all this? Because wanna be sure that the css of the page won't enter 
// in conflict with the css from the color-xplr.
// Quite painful to prevent...
const urls = document.currentScript.dataset.styleHref.split(/\s*,\s*/)
for (const url of urls) {
  fetch(url).then(async response => {
    const css = await response.text()
    const style = document.createElement('style')
    style.className = 'css-prefixed'
    document.head.append(style)
    style.innerHTML = transformCSS(css, {
      comment: () => '',
      selector: s => `.app ${s}`,
    })
  })
}
