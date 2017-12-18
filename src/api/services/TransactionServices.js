import Transaction from '../../db/models/transaction'
import { errorChecker } from '../../helpers/treater'

let createTransaction = (payload) => {
  return new Promise((resolve, reject) => {
    Transaction
      .create(payload)
      .then((payment) => {
        resolve({
          data: payment,
          status: 201
        })
      })
      .catch((err) => {
        let newError = errorChecker(err)
        return reject(newError)
      })
  })
}

let findTransactions = (trainer_id) => {
  return new Promise((resolve, reject) => {
    Transaction
      .findOne({
        where: {
          trainer_id
        }, 
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      .then((payment) => {
        resolve({
          data: payment || [],
          status: 200
        })
      })
      .catch((err) => {
        let newError = errorChecker(err)
        return reject(newError)
      })
  })
}

export { createTransaction, findTransactions }
