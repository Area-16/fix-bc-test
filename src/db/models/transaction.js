import sequelize from '../index'
import Sequelize from 'sequelize'

let Transaction = sequelize.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tid: {
    type: Sequelize.INTEGER,
    allowNull: false, 
    unique: true
  },
  trainer_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  acquirer_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  authorization_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  payment_method: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  freezeTableName: true
})

Transaction.sync({ force: false })
.then(() => {})
.catch(() => console.log('Transaction model sync error'))

export default Transaction
