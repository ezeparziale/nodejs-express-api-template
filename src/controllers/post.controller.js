const Post = require('../models/post.model')
const User = require('../models/user.model')

const getAllPost = async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 20
  const offset = (page - 1) * limit

  try {
    const posts = await Post.findAll(
      {
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: ['id', 'email'] }]
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
        include: [{ model: User, attributes: ['id', 'email'] }]
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
    const newPost = await Post.create({ ...req.body, authorId })
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
    const post = await Post.findOne({ where: { id } })

    if (post) {
      await Post.update(req.body, { where: { id } })
      res.status(200).json({ message: 'Post updated' })
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating post', error: error.message })
  }
}

const deleteOnePost = async (req, res) => {
  const id = req.params.postId
  try {
    const deletePost = await Post.destroy({ where: { id } })
    if (deletePost) {
      return res.status(204).json({ message: 'Post deleted' })
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
