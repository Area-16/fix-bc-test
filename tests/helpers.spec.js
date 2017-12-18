import { expect, should } from 'chai'

import Jwt from '../src/helpers/jwt'
import { errors, general, success } from '../src/helpers/loggify'
import { errorChecker } from '../src/helpers/treater'

describe('Teste de utilitarios/helpers', () => {
  
  describe('Testes Jwt', () => {
    let jwtClass

    before(() => {
       jwtClass = new Jwt()
    })

    it('Class Jwt should exist', () => {
      expect(Jwt).to.exist
    })
    it('Class Jwt should have method createToken', () => {
      expect(jwtClass.createToken).to.exist
    })
    it('Class Jwt should have method verifyToken', () => {
      expect(jwtClass.verifyToken).to.exist
    })
    it('Class Jwt should have method decodeToken', () => {
      expect(jwtClass.decodeToken).to.exist
    })
  })

  describe('Testes Loggers', () => {

    it('Logger general should exist', () => {
      expect(general).to.exist
    })

    it('Logger general should be a function', () => {
      expect(general).to.be.a('function')
    })
    
    it('Logger errors should exist', () => {
      expect(errors).to.exist
    })
    
    it('Logger errors should be a function', () => {
      expect(errors).to.be.a('function')
    })

    it('Logger general should exist', () => {
      expect(success).to.exist    
    })

    it('Logger general should be a function', () => {
      expect(success).to.be.a('function')
    })
  })

  describe('Testes Error Treater', () => {
    let errDescription
    let errResponse
    beforeEach(() => {
      errDescription = ''
      errResponse = ''
    })

    it('errorChecker should exist', () => {
      expect(errorChecker).to.exist
    })
    
    it('errorChecker should be a function', () => {
      expect(errorChecker).to.be.a('function')
    })

    it(`Should return an object with err:'An error ocurred' and status: 400 `, () => {
      errDescription = 'Unknown error' 
      errResponse = errorChecker({
        message: errDescription
      })

      expect(errResponse).to.be.a('object')
      expect(errResponse.err).to.be.equal('An error ocurred') 
      expect(errResponse.status).to.be.equal(500)      
    })

  })
})