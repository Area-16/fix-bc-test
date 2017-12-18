import { sign, verify, decode } from 'jsonwebtoken'

import env from './../config/env'

const secretkey = env.TOKEN_SECRET || Math.floor((Math.random * 9999) * Math.random).toString()

export default class Token {
  createToken (payload) {
    try {
      const token = sign(payload, secretkey, { expiresIn: 60 * 60 * 15 })
      return `Bearer ${token}`
    } catch (err) {
      return null
    }
  }

  verifyToken (token) {
    try {
      let rawToken = token.split('Bearer ')
      const valid = verify(rawToken[1], secretkey.toString())
      return valid
    } catch (err) {
      return false
    }
  }

  decodeToken (token) {
    try {
      const payLoad = decode(token)
      return payLoad
    } catch (err) {
      return null
    }
  }
}
