import Sequelize from 'sequelize'

import conn from '../db'

const Trainers = conn.define('trainer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'BR'
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false
  },
  street_number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  doc_type: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'cpf'
  },
  doc_num: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
{
  freezeTableName: true
})

Trainers.sync({ force: false })
  .then(() => {})
  .catch(() => console.log('Trainers model sync error'))
export default Trainers
