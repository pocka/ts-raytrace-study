import { Scene } from './types.js'
import { plane, sphere } from './primitive.js'
import { shiny, checkboard } from './surfaces.js'
import * as camera from './camera.js'
import * as rayTracer from './rayTracer.js'

const defaultScene = (): Scene => ({
  things: [
    plane([0.0, 1.0, 0.0], 0.0, checkboard),
    sphere([0.0, 1.0, -0.25], 1.0, shiny),
    sphere([-1.0, 0.5, 1.5], 0.5, shiny)
  ],
  lights: [
    { position: [-2.0, 2.5, 0.0], color: [0.49, 0.07, 0.07] },
    { position: [1.5, 2.5, 1.5], color: [0.07, 0.07, 0.49] },
    { position: [1.5, 2.5, -1.5], color: [0.07, 0.49, 0.07] },
    { position: [0.0, 3.5, 0.0], color: [0.21, 0.21, 0.35] }
  ],
  camera: camera.create([3.0, 2.0, 4.0], [-1.0, 0.5, 0.0])
})

async function main() {
  const canvas = document.createElement('canvas')

  const width = 256
  const height = 256

  canvas.width = width
  canvas.height = height

  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')

  rayTracer.render(defaultScene(), ctx!, width, height)
}

main()
