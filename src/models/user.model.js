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
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Post.belongsTo(User, { foreignKey: 'author_id' })

User.hasMany(Vote,
  {
    as: 'user',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Vote.belongsTo(User, { foreignKey: 'user_id' })

module.exports = User
