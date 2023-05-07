const { DataTypes, Model } = require('sequelize')
const Vote = require('./vote.model')

const sequelize = require('../configs/db.config')

class Post extends Model { }

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'posts'
})

Post.hasMany(Vote,
  {
    as: 'vote',
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Vote.belongsTo(Post, { foreignKey: 'postId', as: 'vote' })

module.exports = Post
