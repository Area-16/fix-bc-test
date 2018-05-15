import { expect } from 'chai'

import db from '../src/db/index'
import poke from '../src/db/models/pokemon'
import trainer from '../src/db/models/trainer'
import transaction from '../src/db/models/transaction'

describe('Db/models test', () => {
  
  describe('Database should exist', () => {
    expect(db).to.exist
  })

  describe('Pokemon model should exist', () => {
    expect(poke).to.exist
  })

  describe('Trainer model should exist', () => {
    expect(trainer).to.exist
  })

  describe('Transaction model exist', () => {
    expect(transaction).to.exist
  })

})