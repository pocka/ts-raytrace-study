import { foo } from './mod.js'

console.log(foo)

async function main() {
  const el = document.createElement('canvas')

  document.body.appendChild(el)
}

main()
