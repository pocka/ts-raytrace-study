var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value)
            }).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
import { plane, sphere } from './primitive.js'
import { shiny, checkboard } from './surfaces.js'
import * as camera from './camera.js'
import * as rayTracer from './rayTracer.js'
const defaultScene = () => ({
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
function main() {
  return __awaiter(this, void 0, void 0, function*() {
    const canvas = document.createElement('canvas')
    const width = 256
    const height = 256
    canvas.width = width
    canvas.height = height
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    rayTracer.render(defaultScene(), ctx, width, height)
  })
}
main()
