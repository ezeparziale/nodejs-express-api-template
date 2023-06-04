const { DataTypes, Model } = require('sequelize')
const Post = require('./post.model')
const Vote = require('./vote.model')

const sequelize = require('../configs/db.config')

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users',
  underscored: true
})

User.hasMany(Post,
  {
    as: 'author',
    foreignKey: 'authorId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Post.belongsTo(User, { foreignKey: 'authorId' })

User.hasMany(Vote,
  {
    as: 'user',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Vote.belongsTo(User, { foreignKey: 'userId' })

module.exports = User
