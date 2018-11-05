import * as vector from './vector.js'
import { Surface, Thing } from './types.js'

export const sphere = (
  center: vector.Vector,
  radius: number,
  surface: Surface
): Thing => {
  const radius2 = radius * radius

  const thing: Thing = {
    intersect(ray) {
      const eo = vector.minus(center, ray.start)
      const v = vector.dot(eo, ray.direction)

      let dist = 0
      if (v >= 0) {
        const disc = radius2 - (vector.dot(eo, eo) - v * v)

        if (disc >= 0) {
          dist = v - Math.sqrt(disc)
        }
      }

      return dist === 0 ? null : { thing, ray, dist }
    },
    normal(pos) {
      return vector.norm(vector.minus(pos, center))
    },
    surface
  }

  return thing
}

export const plane = (
  norm: vector.Vector,
  offset: number,
  surface: Surface
): Thing => {
  const thing: Thing = {
    intersect(ray) {
      const denom = vector.dot(norm, ray.direction)

      if (denom > 0) {
        return null
      }

      const dist = (vector.dot(norm, ray.start) + offset) / -denom

      return { thing, ray, dist }
    },
    normal(pos) {
      return norm
    },
    surface
  }

  return thing
}
