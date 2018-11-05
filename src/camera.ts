import * as vector from './vector.js'

export interface Camera {
  position: vector.Vector
  forward: vector.Vector
  right: vector.Vector
  up: vector.Vector
}

export default Camera

export const create = (
  position: vector.Vector,
  lookAt: vector.Vector
): Camera => {
  const down: vector.Vector = [0.0, -1.0, 0.0]

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
