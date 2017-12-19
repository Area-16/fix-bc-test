import express from 'express'
import { json, urlencoded } from 'body-parser'
import helmet from 'helmet'

import '../db/index'
import cors from './cors'
import env from './env'
import { success, general, errors } from '../helpers/loggify'
import pokemon from '../api/controllerPokemon'
import trainer from '../api/controllerTrainer'
import transaction from '../api/controllerTransaction'

const app = express()
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors)
app.use([success, general, errors])
app.use(`${env.API_PREFIX}`, [pokemon, trainer, transaction])

app.set('port', env.PORT || 3000)

app.get('/healthcheck', (req, res) =>
  res.status(200).json({ message: 'The API is working correctly!' }))

app.listen(app.set('port'), () => {
  console.log(`Listening on http://localhost:${app.set('port')}`)
})

export default app
