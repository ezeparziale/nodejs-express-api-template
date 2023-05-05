const { DataTypes, Model } = require('sequelize')

const sequelize = require('../config/database')

class Vote extends Model { }

Vote.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  sequelize,
  tableName: 'votes'
})

module.exports = Vote
