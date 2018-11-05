import * as vector from './vector.js'
export const create = (position, lookAt) => {
  const down = [0.0, -1.0, 0.0]
  const forward = vector.norm(vector.minus(lookAt, position))
  const right = vector.times(vector.norm(vector.cross(forward, down)), 1.5)
  const up = vector.times(vector.norm(vector.cross(forward, right)), 1.5)
  return {
    position,
    forward,
    right,
    up
  }
}
