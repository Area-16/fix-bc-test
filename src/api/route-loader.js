import { readdirSync } from 'fs'
import { join } from 'path'

const getModules = () =>
  readdirSync(join(__dirname, '/controllers/')).filter(file =>
    (file.endsWith('.js')))

const getRouters = (modulos) =>
  modulos.map((modulo) => {
    return require(`./controllers/${modulo}`).default
  })

function bootstrap () {
  const modules = getModules()
  return getRouters(modules || [''])
}

export default bootstrap
