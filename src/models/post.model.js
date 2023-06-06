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
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'posts',
  underscored: true
})

Post.hasMany(Vote,
  {
    as: 'vote',
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Vote.belongsTo(Post, { foreignKey: 'post_id', as: 'vote' })

module.exports = Post
