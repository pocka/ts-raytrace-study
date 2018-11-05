import { white, black, grey } from './color.js'
import { Surface } from './types.js'

export const shiny: Surface = {
  diffuse() {
    return white
  },
  specular() {
    return grey
  },
  reflect() {
    return 0.7
  },
  roughness: 250
}

export const checkboard: Surface = {
  diffuse(pos) {
    if ((Math.floor(pos[2]) + Math.floor(pos[0])) % 2 !== 0) {
      return white
    }

    return black
  },
  specular() {
    return white
  },
  reflect(pos) {
    if ((Math.floor(pos[2]) + Math.floor(pos[0])) % 2 !== 0) {
      return 0.1
    }

    return 0.7
  },
  roughness: 150
}
