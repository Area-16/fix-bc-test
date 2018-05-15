import { join } from 'path'
import winston from 'winston'

winston.level = process.env.NODE_ENV;

winston.configure({
  transports: [new (winston.transports.File)({ filename: join(__dirname, '../../logs/exceptions.log') })]
});

export default winston
