/**
 * Apply v * k
 * @param v
 * @param k
 */
export const times = (v, k) => [v[0] * k, v[1] * k, v[2] * k]
/**
 * Apply v1 - v2
 */
export const minus = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]
/**
 * Apply v1 + v2
 */
export const plus = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
/**
 * Apply v1・v2
 */
export const dot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
/**
 * Get the magnitude of v
 */
export const magnitude = v => Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
/**
 * magnitude == Euclide norm
 * What is this???
 */
export const norm = v => {
  const mag = magnitude(v)
  const div = mag === 0 ? Infinity : 1.0 / mag
  return times(v, div)
}
/**
 * Get [v1,v2]
 */
export const cross = (v1, v2) => [
  v1[1] * v2[2] - v1[2] * v2[1],
  v1[2] * v2[0] - v1[0] * v2[2],
  v1[0] * v2[1] - v1[1] * v2[0]
]
