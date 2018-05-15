import Axios from 'axios'

import Pokemon from '../../models/pokemon'
import env from '../../config/env'
import { findOneTrainer } from './TrainerServices'
import { createTransaction } from './TransactionServices'
import { errorChecker } from '../../helpers/treater'

let findAllPokemons = (limit) => {
  return new Promise ((resolve, reject) => {
    Pokemon.findAll({
      attributes: ['id', 'name', 'price', 'stock'],
      limit,
      order: [
        ['name', 'ASC']
      ]
    })
      .then((pokemons) => {
        resolve({
          data: pokemons || [],
          status: 200
        })
      })
      .catch((err) => {
        return reject(errorChecker(err))
      })
  })
}

let findOnePokemon = (name) => {
  return new Promise ((resolve, reject) => {
    name = name.toUpperCase()
    Pokemon.findOne({
     where: { name: name },
     attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
    })
      .then((pokemon) => {
        resolve({
          data: pokemon || {},
          status: 200
        })
      })
      .catch((err) => {
        return reject(errorChecker(err))
      })
  })
}


let CreatePokemon = (pokeInfo) => {
  return new Promise ((resolve, reject) => {
    let { name } = pokeInfo
    pokeInfo.name = name.toUpperCase()
    Pokemon.create(pokeInfo)
      .then((pokemon) => {
        resolve({
          data: pokemon,
          status: 201
        })
      })
      .catch((err) => {
        return reject(errorChecker(err))
      })
  })
}


let buyPokemon = (payload) => {
  let { trainer, transaction, pokemon } = payload

  return new Promise ((resolve, reject) => {
    Promise.all([
      findOnePokemon(pokemon.name)
      .then(data => data.data),
      findOneTrainer(payload.trainer.doc_num)
      .then((data)=> data.data)
    ]).then((data) => {
      let [selectedPokemon, selectedTrainer ] = data

      if (selectedTrainer === {}) {
        return reject({
          err: 'The necessary trainer data was not found',
          status: 400
        })
      }

      if (selectedPokemon === {}) {
        return reject({
          err: 'The necessary pokemon data was not found',
          status: 400
        })
      }

      if (selectedPokemon.stock < transaction.quantity) {
        return reject({
          err: 'Not enough ' + selectedPokemon.name + ' in stock: ' + selectedPokemon.stock,
          status: 400
        })
      }

      Axios.post(env.PAGARME_ENDPOINT, {
        api_key: env.PAGARME_API_KEY,
        amount: ((selectedPokemon.price * transaction.quantity) * 100),
        card_number: transaction.card_number,
        card_expiration_date: transaction.card_expiration_date,
        card_holder_name: transaction.card_holder_name,
        card_cvv: transaction.card_cvv,
        soft_descriptor: `${selectedPokemon.name}`,
        customer: {
          external_id: `${selectedTrainer.id}`,
          name: selectedTrainer.name,
          type: 'individual',
          country: selectedTrainer.country.toLowerCase(),
          email: selectedTrainer.email,
          documents: [
            {
              type: selectedTrainer.doc_type,
              number: selectedTrainer.doc_num
            }
          ],
          phone_numbers: trainer.phone_numbers,
          birthday: trainer.birthday
        },
        billing: {
          name: selectedTrainer.name,
          address: {
            country: selectedTrainer.country.toLowerCase(),
            state: selectedTrainer.state,
            city: selectedTrainer.city,
            neighborhood: selectedTrainer.neighborhood,
            street: selectedTrainer.street,
            street_number: selectedTrainer.street_number,
            zipcode: selectedTrainer.zip_code
          }
        },
        items: [{
          id: `${selectedPokemon.id}`,
          title: selectedPokemon.name.toUpperCase(),
          unit_price: selectedPokemon.price * 100,
          quantity: transaction.quantity,
          tangible: true
        }]
      })
      .then(({ data }) => {
        if ( data.status !== 'paid' && data.status !== 'authorized' ) {
          return reject({
            err: `Your payment wasn't confirmed`,
            status: 400
          })
        }
        selectedPokemon.stock = selectedPokemon.stock - transaction.quantity
        selectedPokemon.save({
          returning: true
        }).then((pokemon) => {
          createTransaction({
            tid: data.tid,
            status: data.status,
            acquirer_id: data.acquirer_id,
            authorization_code: data.authorization_code,
            payment_method: data.payment_method,
            trainer_id: selectedTrainer.id
          }).then((paymentInfo) => {
            return resolve({
              data: {
                message: 'Your transaction was successful!',
                pokemon,
                paymentId: data.tid
              },
              status: 201
            })
          }).catch((err)=> {
            return reject(errorChecker(err))
          })
        }).catch((err) => {
          return reject(errorChecker(err))
        })
      })
      .catch(({ response })=> {
         let errorType = response.data.errors
        if (errorType.length) {
          errorType = response.data.errors[0].type
        }
        return reject(errorChecker(Error(errorType)))
      })
    }).catch((err) => {
      return reject(errorChecker(err))
    })
  })
}

export { CreatePokemon, findOnePokemon, findAllPokemons, buyPokemon }
