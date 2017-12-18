import Sequelize from 'sequelize'

const connection = new Sequelize(process.env.DB_NAME, null, null, {
  operatorsAliases: false,
  dialect: 'sqlite',
  storage: './pokemon_db',
  logging: false
})

export default connection
