import { Router } from 'express'
import Joi from 'joi'

import { CreatePokemon, findAllPokemons, buyPokemon, findOnePokemon } from './services/PokeServices'
import Jwt from './../helpers/jwt'

const router = Router()
let schema = {}
let authJwt

router.get('/v1/pokemon', (req, res, next) => {
  authJwt = new Jwt()

  let tokenStatus = authJwt.verifyToken(req.headers.Authorization || req.headers.authorization)
  if (!tokenStatus) {
    return res.status(400).json({
      message: 'Your session will be terminated',
      status: 400
    })
  }

  next()
},
(req, res) => {
  let limit = req.query.limit || req.body.limit
  findAllPokemons(limit)
    .then((data) => {
      res.status(data.status).json(data)
    })
    .catch((err) => {
      res.status(err.status).json(err)
    })
})

router.get('/v1/pokemon/:name', (req, res, next) => {
  authJwt = new Jwt()

  let tokenStatus = authJwt.verifyToken(req.headers.authorization)

  if (!tokenStatus) {
    return res.status(400).json({
      message: 'Your session will be terminated',
      status: 400
    })
  }

  next()
}, (req, res) => {
  let { name } = req.params
  findOnePokemon(name)
    .then((data) => {
      res.status(data.status).json(data)
    })
    .catch((err) => {
      res.status(err.status).json(err)
    })
})

router.post(`/v1/pokemon`, (req, res, next) => {
  schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().optional()
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload body',
        key: value,
        status: 400
      })
    }
  })

  next()
}, (req, res) => {
  let { name, price, stock } = req.body

  CreatePokemon({
    name,
    price,
    stock
  })
    .then((data) => {
      return res.status(data.status).json(data)
    })
    .catch((err) => {
      return res.status(err.status).json(err)
    })
})

router.post('/v1/payment', (req, res, next) => {
  authJwt = new Jwt()

  let tokenStatus = authJwt.verifyToken(req.headers.authorization)

  if (!tokenStatus) {
    return res.status(400).json({
      message: 'Your session will be terminated',
      status: 400
    })
  }

  schema = Joi.object({
    trainer: Joi.object({
      doc_num: Joi.string().required(),
      phone_numbers: Joi.array().required(),
      birthday: Joi.string().required()
    }),
    pokemon: Joi.object({
      name: Joi.string().required()
    }),
    transaction: Joi.object({
      quantity: Joi.number().required(),
      card_number: Joi.string().required(),
      card_expiration_date: Joi.string().required(),
      card_holder_name: Joi.string().required(),
      card_cvv: Joi.string().required()
    })
  })

  Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      return res.status(400).json({
        message: 'Invalid payload',
        key: value,
        status: 400
      })
    } else {
      next()
    }
  })
}, (req, res) => {
  buyPokemon(req.body)
    .then((data) => {
      return res.status(data.status).json(data)
    })
    .catch((err) => {
      return res.status(err.status).json(err)
    })
})

export default router
