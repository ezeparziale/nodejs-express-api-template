const { Sequelize } = require('sequelize')
const Post = require('../models/post.model')
const User = require('../models/user.model')
const Vote = require('../models/vote.model')

const getAllPost = async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 20
  const offset = (page - 1) * limit

  try {
    const posts = await Post.findAll(
      {
        limit,
        offset,
        order: [['created_at', 'DESC']],
        attributes: {
          include: [
            [Sequelize.fn('COUNT', Sequelize.col('vote.post_id')), 'votes']
          ]
        },
        include: [
          {
            model: User,
            attributes: ['id', 'email'],
            required: false
          },
          {
            model: Vote,
            attributes: [],
            duplicating: false,
            as: 'vote'
          }
        ],
        group: ['Post.id', 'User.id']
      }
    )
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while retrieving posts', error: error.message })
  }
}

const getOnePost = async (req, res) => {
  const id = req.params.postId

  try {
    const post = await Post.findOne(
      {
        where: { id },
        attributes: {
          include: [
            Sequelize.col('Post.*'),
            [Sequelize.fn('COUNT', Sequelize.col('vote.post_id')), 'votes']
          ]
        },
        include: [
          {
            model: User,
            attributes: ['id', 'email']
          },
          {
            model: Vote,
            attributes: [],
            as: 'vote'
          }
        ],
        group: ['Post.id', 'User.id']
      }
    )
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while retrieving the post', error: error.message })
  }
}

const createNewPost = async (req, res) => {
  const authorId = req.userId
  try {
    const newPost = await Post.create({ ...req.body, author_id: authorId })
    res.status(201).json({
      message: 'Post created',
      postId: newPost.id
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating post', error: error.message })
  }
}

const updateOnePost = async (req, res) => {
  const id = req.params.postId

  try {
    const post = await Post.findByPk(id)
    if (post) {
      if (post.author_id === req.userId) {
        await Post.update(req.body, { where: { id } })
        res.status(200).json({ message: 'Post updated' })
      } else {
        return res.status(403).send()
      }
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating post', error: error.message })
  }
}

const deleteOnePost = async (req, res) => {
  const id = req.params.postId
  try {
    const post = await Post.findByPk(id)
    if (post) {
      if (post.author_id === req.userId) {
        await Post.destroy({ where: { id } })
        return res.status(204).send()
      } else {
        return res.status(403).send()
      }
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting post', error: error.message })
  }
}

module.exports = {
  getAllPost,
  getOnePost,
  createNewPost,
  updateOnePost,
  deleteOnePost
}
