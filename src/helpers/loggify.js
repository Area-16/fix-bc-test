import { createWriteStream } from 'fs'
import { join } from 'path'
import morgan from 'morgan'

const defaultLog = ':method :url :status :res[content-length] - :response-time ms'
const defaultPath = '../../'

const sucessLog = createWriteStream(join(__dirname, `${defaultPath}sucess.log`), { flags: 'a' })
const errorsLog = createWriteStream(join(__dirname, `${defaultPath}errors.log`), { flags: 'a' })
const generalLog = createWriteStream(join(__dirname, `${defaultPath}general.log`), { flags: 'a' })

const success = morgan(defaultLog, { skip: (req, res) => { return res.statusCode > 299 }, stream: sucessLog })
const errors = morgan(defaultLog, { skip: (req, res) => { return res.statusCode < 300 }, stream: errorsLog })
const general = morgan(defaultLog, { stream: generalLog })

export { success, errors, general }
