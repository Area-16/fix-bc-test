import express from 'express'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'

import './env'
import '../db/index'
import cors from './cors'
import { success, general, errors } from '../helpers/loggify'
import routes from '../api/route-loader'

const app = express()

app.use(helmet({ hidePoweredBy: true }))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors)
app.use([success, general, errors])
app.use(`${process.env.API_PREFIX}`, [...routes()])

app.set('port', process.env.PORT || 3000)

app.use('/healthcheck', (req, res) =>
  res.send({ data: { message: 'The API is working correctly!' }, status: 200 }))

app.listen(app.get('port'), () => {
  console.info(`Listening on port: ${app.get('port')}`)
})

export default app
