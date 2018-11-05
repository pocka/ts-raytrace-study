export type Color = [number, number, number]

export default Color

export const RED = 0
export const GREEN = 1
export const BLUE = 2

export const R = RED
export const G = GREEN
export const B = BLUE

/**
 * c * k
 */
export const scale = (c: Color, k: number): Color => [
  c[R] * k,
  c[G] * k,
  c[B] * k
]

/**
 * c1 + c2
 */
export const plus = (c1: Color, c2: Color): Color => [
  c1[R] + c2[R],
  c1[G] + c2[G],
  c1[B] + c2[B]
]

/**
 * c1 * c2
 */
export const times = (c1: Color, c2: Color): Color => [
  c1[R] * c2[R],
  c1[G] * c2[G],
  c1[B] * c2[B]
]

export const white: Color = [1.0, 1.0, 1.0]
export const grey: Color = [0.5, 0.5, 0.5]
export const black: Color = [0.0, 0.0, 0.0]

export const to256Colors = (c: Color) => {
  const clip = (d: number) => (d > 1 ? 1 : d)

  return [
    Math.floor(clip(c[R]) * 255),
    Math.floor(clip(c[G]) * 255),
    Math.floor(clip(c[B]) * 255)
  ]
}
