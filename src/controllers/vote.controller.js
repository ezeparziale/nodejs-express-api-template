const Vote = require('../models/vote.model')
const Post = require('../models/post.model')

const createVote = async (req, res) => {
  const userId = req.userId
  const { postId, dir } = req.body

  try {
    const post = await Post.findOne({ where: { id: postId } })
    if (post) {
      const existVote = await Vote.findOne({ where: { postId, userId } })
      if (dir === 1) {
        if (existVote) {
          return res.status(409).json({ message: 'Vote already exits' })
        }
        await Vote.create({ postId, userId })
        return res.status(201).json({
          message: 'Succefully added vote'
        })
      } else {
        if (!existVote) {
          return res.status(404).json({ message: 'Vote not exits' })
        }
        await Vote.destroy({ where: { postId, userId } })
        return res.status(201).json({
          message: 'Succefully deleted vote'
        })
      }
    } else {
      return res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error voting', error: error.message })
  }
}

module.exports = { createVote }
