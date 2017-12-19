import Trainer from '../../db/models/trainer'
import { createHash } from 'crypto'
import { errorChecker } from '../../helpers/treater'
import Jwt from '../../helpers/jwt'

let findOneTrainer = (doc_num) => {
  return new Promise ((resolve, reject) => {
    Trainer.findOne({
      where: {
        doc_num
      },
      attributes: { 
        exclude: ['password', 'createdAt', 'updatedAt'] 
      }  
    })
      .then((trainer) => {
        resolve({
          data: trainer || {},
          status: 200
        })
      })
      .catch((err) => {
        return reject(errorChecker(err))
      })
  })
}

let Login = (authInfo) => {
  return new Promise ((resolve, reject) => {
    let hashedPassword = createHash('md5').update(authInfo.password).digest('hex')
    Trainer.findOne({
      where: {
        email: authInfo.email,
        password: hashedPassword
      },
      attributes: { 
        exclude: ['password', 'createdAt', 'updatedAt'] 
      }  
    })
      .then((trainer) => {
        if (trainer) {
          let authJwt = new Jwt()
          let token = authJwt.createToken({
            id: trainer.id
          })
          resolve({
            data: trainer,
            status: 200,
            token
          })

        } else {
          throw Error('session_start')
        }

      })
      .catch((err) => {
        return reject(errorChecker(err))
      })
  })
}

let CreateTrainer = (trainerInfo) => {
  return new Promise ((resolve, reject) => {
    trainerInfo.password = createHash('md5').update(trainerInfo.password).digest('hex')
    Trainer.create(trainerInfo)
      .then((trainer) => {
        trainer.password = undefined
        resolve({
          data: trainer,
          status: 201
        })
      })
      .catch((err) => {
        
        return reject(errorChecker(err))
      })
  })
}

export { findOneTrainer, CreateTrainer, Login  }