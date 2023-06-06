const { DataTypes, Model } = require('sequelize')

const sequelize = require('../configs/db.config')

class Vote extends Model { }

Vote.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  tableName: 'votes',
  underscored: true
})

module.exports = Vote
