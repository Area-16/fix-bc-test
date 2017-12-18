import { Router } from 'express'
import Joi from 'joi'

import { findTransactions } from './services/TransactionServices'
import Jwt from './../helpers/jwt'

let router = Router()

router.get('/v1/transaction/:trainer_id', (req, res, next) => {
  let authJwt = new Jwt()

  let tokenStatus = authJwt.verifyToken(req.headers.authorization)

  if (!tokenStatus) {
    return res.status(400).json({
      message: 'Your session will be terminated',
      status: 400
    })
  }

  let schema = Joi.object({
    trainer_id: Joi.number().required()
  })

  Joi.validate(req.params, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload params',
        key: value,
        status: 400
      })
    } else {
      next()
    }
  })
}, (req, res) => {
  findTransactions(req.params.trainer_id)
    .then((data) => {
      res.status(data.status).json(data)
    })
    .catch((err) => {
      res.status(err.status).json(err)
    })
})

export default router
