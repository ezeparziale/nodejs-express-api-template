const { Sequelize } = require('sequelize')
const {
  POSTGRES_HOSTNAME,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
  POSTGRES_DB
} = require('./general.config')

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'database.sqlite'
// })

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOSTNAME,
  dialect: 'postgres',
  logging: false
})

sequelize.sync() // { force: true }

module.exports = sequelize
