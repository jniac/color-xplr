# 1.0.12 (incoming)
- Support of [color keywords](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color), 
  based on [three.js/Color](https://github.com/mrdoob/three.js/blob/master/src/math/Color.js)
  - ```
    new Color().from('green').toHexString() // "#008000"
    ```
  - ```
    new Color().set(1, 0, 0).toString({ mode: 'keywords' }) // "red"
    ```
  - ```
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