export const clamp01 = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x
export const positiveModulo = (x: number, m: number) => (x %= m) > 0 ? x : x + m
export const to0xff = (x: number) => Math.min(Math.floor(x * 0x100), 0xff)
export const mix = (a: number, b: number, alpha: number) => a + (b - a) * alpha
