# 1.0.14
- Fix "hex triplet" bug
  - When the input change to a triplet value (with or without alpha, ex: #fc0 or #fc03)
  the value was immediately parsed and transformed to a regular hex string. But it 
  was intempestive and makes it impossible to use the backspace key.
- `ColorParseOptions` is exposed (public).

# 1.0.13
- Fix broken input (changing the value did not update the app).
- Easy paste:
  - When used via a modal, the app catch "paste" events (no need to focus the input).
- Add a `fontSize` parameter:
  ```ts
  createColorXplr({
    style: {
      fontSize: '18px',
    },
  })
  ```
- Slight design improvements 
  - bigger hit area for buttons
  - slighly bigger font
  - etc.

# 1.0.12
- Support of [color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color), 
  based on [three.js/Color](https://github.com/mrdoob/three.js/blob/master/src/math/Color.js)
  - ```ts
    new Color().from('green').toHexString() // "#008000"
    ```
  - ```ts
    new Color().set(1, 0, 0).toString({ mode: 'keywords' }) // "red"
    ```
  - ```ts
    new Color().from("foo").toHexString() // error "Invalid string"
    ```
- Implementation of Color.parse()
  - Supported modes : 'hex' | 'rgb' | 'hsl' | 'glsl' | 'keywords'


# 1.0.11
- Fix missing `Partial<>` in modal params declaration.

# 1.0.10
- Color.toString(): "string" mode (hex, rgb, hsl, glsl) & "alpha" mode (always, never, auto)
- Explorer: 
  - string mode support (display, copy to clipboard)
  - alpha string mode (button)
  - alpha comparison (split views)

# 1.0.9
- Normalized params: one place, one file
  - "style" & "modal" params as sub hashmaps of "ColorXplrParams".
- Tiny css fix (blurry slider background).

# 1.0.6
- Support alpha channel