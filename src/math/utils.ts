export const clamp01 = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x
export const positiveModulo = (x: number, m: number) => (x %= m) > 0 ? x : x + m
export const to0xff = (x: number) => Math.min(Math.floor(x * 0x100), 0xff)
export const lerpUnclamped = (a: number, b: number, alpha: number) => a + (b - a) * alpha
export const inout = (x: number, p: number = 3, i: number = 0.5) => {
  return (x < 0 ? 0 : x > 1 ? 1 : x < i
    ? 1 / Math.pow(i, p - 1) * Math.pow(x, p)
    : 1 - 1 / Math.pow(1 - i, p - 1) * Math.pow(1 - x, p)
  )
}
