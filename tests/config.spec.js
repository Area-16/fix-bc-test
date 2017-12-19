import { expect } from 'chai'

import env from './../src/config/env'
import cors from './../src/config/cors'

describe('Teste de utilitarios/helpers', () => {
  
  describe('Testes Env', () => {
    it('env should exist', () => {
      expect(env).to.exist
    })

    it('env should be a object', () => {
      expect(env).to.be.a('object')
    })
  })

  describe('Testes CORS', () => {
    it('cors should exist', () => {
      expect(cors).to.exist
    })

    it('CORS should be a function', () => {
      expect(cors).to.be.a('function')
    })
  })
  
})