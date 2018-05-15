import { Router } from 'express'
import Joi from 'joi'

import { CreateTrainer, findOneTrainer, Login } from '../services/TrainerServices'
import Jwt from '../../helpers/jwt'

let router = Router()
let schema

router.get('/v1/trainer/:doc_num', (req, res, next) => {
  let authJwt = new Jwt()
  let tokenStatus = authJwt.verifyToken(req.headers.authorization)

  if (!tokenStatus) {
    return res.status(400).json({
      message: 'Your session will be terminated',
      status: 400
    })
  }

  schema = Joi.object({
    doc_num: Joi.string().required()
  })

  Joi.validate(req.params, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload params',
        status: 400
      })
    } else {
      next()
    }
  })
}, (req, res) => {
  findOneTrainer(req.params.doc_num)
    .then((data) => {
      res.status(data.status).json(data)
    })
    .catch((err) => {
      res.status(err.status).json(err)
    })
})

router.post('/v1/trainer', (req, res, next) => {
  schema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string().optional(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zip_code: Joi.string().required(),
    street: Joi.string().required(),
    street_number: Joi.number().required(),
    email: Joi.string().required(),
    doc_type: Joi.string().optional(),
    doc_num: Joi.string().required(),
    password: Joi.string().required()
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload body',
        status: 400
      })
    } else {
      next()
    }
  })
}, (req, res) => {
  CreateTrainer(req.body)
    .then((data) => {
      return res.status(data.status).json(data)
    })
    .catch((err) => {
      return res.status(err.status).json(err)
    })
})

router.post('/v1/login', (req, res, next) => {
  schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload body',
        status: 400
      })
    } else {
      next()
    }
  })
}, (req, res) => {
  Login(req.body)
    .then((data) => {
      res.setHeader('authorization', data.token)
      delete data.token
      return res.status(data.status).json(data)
    })
    .catch((err) => {
      return res.status(err.status).json(err)
    })
})

export default router
