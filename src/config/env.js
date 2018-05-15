import envDeploy from 'env-deploy'

const getEnv = () => {
  return Object.assign({}, process.env)
}

const setEnv = () => {
  envDeploy()
}

export default setEnv
export { getEnv }
