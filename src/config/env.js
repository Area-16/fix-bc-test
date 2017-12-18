import envDeploy from 'env-deploy'

let getEnv = () => {
  envDeploy()
  return Object.assign({}, process.env)
}

export default getEnv()
