import { sign, verify, decode } from 'jsonwebtoken'

import env from './../config/env'

const secretkey = env.TOKEN_SECRET || Math.floor((Math.random * 9999) * Math.random).toString()

export default class Token {
  static createToken (payload) {
    try {
      const token = sign(payload, secretkey, { expiresIn: 60 * 60 * 15 })
      return `Bearer ${token}`
    } catch (err) {
      console.error(err.message)
      return null
    }
  }

  static verifyToken (token) {
    try {
      const rawToken = token.split('Bearer ')
      const valid = verify(rawToken[1], secretkey.toString())
      return valid
    } catch (err) {
      console.error(err.message)
      return false
    }
  }

  static decodeToken (token) {
    try {
      const payLoad = decode(token)
      return payLoad
    } catch (err) {
      console.error(err.message)
      return null
    }
  }
}
