import winston from './winstoned'

const errorChecker = (errObj) => {
  const objResponse = {
    data: {
      message: 'An error ocurred',
      code: 'DEFAULT_ERR'
    },
    status: 500
  }

  const erro = errObj.message || errObj.name || errObj.err.name || errObj.type

  try {
    winston.log('error', errObj)

    if (erro) {
      if (erro.includes('SequelizeUniqueConstraintError')) {
        objResponse.message = 'Duplicated data error'
        objResponse.status = 400
      } else
      if (erro.includes('TimeoutError')) {
        objResponse.message = 'Timeout response from the server'
      } else
      if (erro.includes('validation_error')) {
        objResponse.message = 'The received data contains errors'
        objResponse.status = 400
      } else
      if (erro.includes('session_start')) {
        objResponse.message = `Your session couldn't be started`
        objResponse.status = 400
      } else
      if (erro.includes('session_terminated')) {
        objResponse.message = `Your session will be terminated`,
        objResponse.status = 400
      }
    }

    return objResponse
  } catch (e) {
    return objResponse
  }
}

export default errorChecker
export { errorChecker }
