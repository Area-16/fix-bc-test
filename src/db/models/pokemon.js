import sequelize from '../index'
import Sequelize from 'sequelize'

let Pokemon = sequelize.define('pokemon', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1
  }
},
{
  freezeTableName: true
})

Pokemon.sync({ force: false })
  .then(() => {})
  .catch(() => console.log('Pokemon model sync error'))
export default Pokemon
