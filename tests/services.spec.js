import { expect } from 'chai'

import { CreatePokemon, findAllPokemons, buyPokemon, findOnePokemon } from '../src/api/services/PokeServices'
import { CreateTrainer, findOneTrainer, Login } from '../src/api/services/TrainerServices'
import { findTransactions, createTransaction } from '../src/api/services/TransactionServices'

describe('Services tests', () => {
  
  describe('Pokemon services', () => {
    it('CreatePokemon should exist', () => {
      expect(CreatePokemon).to.exist
    })

    it('CreatePokemon should be a function', () => {
      expect(CreatePokemon).to.be.a('function')
    })

    it('findAllPokemons should exist', () => {
      expect(findAllPokemons).to.exist
    })

    it('findAllPokemons should be a function', () => {
      expect(findAllPokemons).to.be.a('function')
    })

    it('buyPokemon should exist', () => {
      expect(buyPokemon).to.exist
    })

    it('buyPokemon should be a function', () => {
      expect(buyPokemon).to.be.a('function')
    })

    it('findOnePokemon should exist', () => {
      expect(findOnePokemon).to.exist
    })

    it('findOnePokemon should be a function', () => {
      expect(findOnePokemon).to.be.a('function')
    })
  })
    describe('Transaction services', () => {
      it('findTransactions should exist', () => {
        expect(findTransactions).to.exist
      })
  
      it('findTransactions should be a function', () => {
        expect(findTransactions).to.be.a('function')
      })

      it('createTransaction should exist', () => {
        expect(createTransaction).to.exist
      })
  
      it('createTransaction should be a function', () => {
        expect(createTransaction).to.be.a('function')
      })
  
    })

    describe('Trainer services', () => {
      it('CreateTrainer should exist', () => {
        expect(CreateTrainer).to.exist
      })
  
      it('CreateTrainer should be a function', () => {
        expect(Login).to.be.a('function')
      })

      it('Login should exist', () => {
        expect(Login).to.exist
      })
  
      it('Login should be a function', () => {
        expect(Login).to.be.a('function')
      })

      it('findOneTrainer should exist', () => {
        expect(findOneTrainer).to.exist
      })
  
      it('findOneTrainer should be a function', () => {
        expect(findOneTrainer).to.be.a('function')
      })
   
    })

})