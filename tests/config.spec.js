import { expect, should } from 'chai'

import env from './../src/config/env'
import middleware from './../src/config/middleware'

describe('Teste de utilitarios/helpers', () => {
  
  describe('Testes Env', () => {
    it('env should exist', () => {
      expect(env).to.exist
    })

    it('env should be a object', () => {
      expect(env).to.be.a('object')
    })
  })

  describe('Testes Middleware', () => {
    it('middleware should exist', () => {
      expect(middleware).to.exist
    })

    it('Middleware should be a function', () => {
      expect(middleware).to.be.a('function')
    })
  })
})