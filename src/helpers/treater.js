import winston from 'winston'

let errorChecker = (errObj) => {
  let objResponse = {
    err: 'An error ocurred',
    status: 500
  }
  let erro = errObj.message || errObj.name || errObj.err.name || errObj.type

  try {
    winston.add(winston.transports.File, { filename: './logs/exceptions.log' })
    winston.remove(winston.transports.Console)
    winston.log('error', errObj)

    if (erro) {
      if (erro.includes('SequelizeUniqueConstraintError')) {
        objResponse.err = 'Duplicated data error'
        objResponse.status = 400
      } else
      if (erro.includes('TimeoutError')) {
        objResponse.err = 'Timeout response from the server'
      } else
      if (erro.includes('validation_error')) {
        objResponse.err = 'The received data contains errors'
        objResponse.status = 400
      } else
      if (erro.includes('session_start')) {
        objResponse.err = `Your session couldn't be started`
        objResponse.status = 400
      } else
      if (erro.includes('session_terminated')) {
        objResponse = {
          err: `Your session will be terminated`,
          status: 400
        }
      }
    }
    return objResponse
  } catch (e) {
    return objResponse
  }
}

export default errorChecker
export { errorChecker }
