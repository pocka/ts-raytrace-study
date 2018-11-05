import * as color from './color.js'
import * as vector from './vector.js'
const MAX_DEPTH = 5
const getClosestIntersection = (ray, scene) => {
  let closest = Infinity
  let closestInter = null
  for (const thing of scene.things) {
    const inter = thing.intersect(ray)
    if (inter && inter.dist < closest) {
      closestInter = inter
      closest = inter.dist
    }
  }
  return closestInter
}
const testRay = (ray, scene) => {
  const isect = getClosestIntersection(ray, scene)
  if (!isect) {
    return null
  }
  return isect.dist
}
const traceRay = (ray, scene, depth) => {
  const isect = getClosestIntersection(ray, scene)
  if (!isect) {
    return color.black
  }
  return shade(isect, scene, depth)
}
const shade = (isect, scene, depth) => {
  const pos = vector.plus(
    vector.times(isect.ray.direction, isect.dist),
    isect.ray.start
  )
  const normal = isect.thing.normal(pos)
  const reflectDir = vector.minus(
    isect.ray.direction,
    vector.times(
      vector.times(normal, vector.dot(normal, isect.ray.direction)),
      2
    )
  )
  const naturalColor = color.plus(
    color.black,
    getNaturalColor(isect.thing, pos, normal, reflectDir, scene)
  )
  const reflectedColor =
    depth >= MAX_DEPTH
      ? color.grey
      : getReflectionColor(isect.thing, pos, normal, reflectDir, scene, depth)
  return color.plus(naturalColor, reflectedColor)
}
const getReflectionColor = (thing, pos, normal, rd, scene, depth) =>
  color.scale(
    traceRay({ start: pos, direction: rd }, scene, depth + 1),
    thing.surface.reflect(pos)
  )
const getNaturalColor = (thing, pos, norm, rd, scene) => {
  const addLight = (col, light) => {
    const ldis = vector.minus(light.position, pos)
    const livec = vector.norm(ldis)
    const neatIsect = testRay({ start: pos, direction: livec }, scene)
    const isInShadow = !neatIsect ? false : neatIsect <= vector.magnitude(ldis)
    if (isInShadow) {
      return col
    }
    const illum = vector.dot(livec, norm)
    const lcolor = illum > 0 ? color.scale(light.color, illum) : color.black
    const specular = vector.dot(livec, vector.norm(rd))
    const scolor =
      specular > 0
        ? color.scale(light.color, Math.pow(specular, thing.surface.roughness))
        : color.black
    return color.plus(
      col,
      color.plus(
        color.times(thing.surface.diffuse(pos), lcolor),
        color.times(thing.surface.specular(pos), scolor)
      )
    )
  }
  return scene.lights.reduce(addLight, color.black)
}
export const render = (scene, ctx, width, height) => {
  const getPoint = (x, y, camera) => {
    const recenterX = x => (x - width / 2.0) / 2.0 / width
    const recenterY = y => -(y - height / 2.0) / 2.0 / height
    return vector.norm(
      vector.plus(
        camera.forward,
        vector.plus(
          vector.times(camera.right, recenterX(x)),
          vector.times(camera.up, recenterY(y))
        )
      )
    )
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const col = traceRay(
        {
          start: scene.camera.position,
          direction: getPoint(x, y, scene.camera)
        },
        scene,
        0
      )
      const c = color.to256Colors(col)
      ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`
      ctx.fillRect(x, y, x + 1, y + 1)
    }
  }
}
