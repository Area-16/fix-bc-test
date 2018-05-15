import Transaction from '../../models/transaction'
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
        return reject(errorChecker(err))
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
        return reject(errorChecker(err))
      })
  })
}

export { createTransaction, findTransactions }
