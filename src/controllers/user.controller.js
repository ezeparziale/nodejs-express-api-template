const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user.model')

const getAllUser = async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 20
  const offset = (page - 1) * limit

  try {
    const posts = await User.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'email']
    })
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching users', error: error.message })
  }
}

const getOneUser = async (req, res) => {
  const id = req.params.userId

  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'email']
    })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while retrieving the user', error: error.message })
  }
}

const createNewUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = await User.create({
      email,
      password: passwordHash
    })
    res.status(201).json({
      message: 'User created',
      userId: newUser.id
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user', error: error.message })
  }
}

const updateOneUser = async (req, res) => {
  const id = req.params.userId
  const { email, password } = req.body

  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = await User.findOne({ where: { id } })

    if (user) {
      await User.update(
        {
          email,
          password: passwordHash
        },
        { where: { id } }
      )
      res.status(200).json({ message: 'User updated' })
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating user', error: error.message })
  }
}

const deleteOneUser = async (req, res) => {
  const id = req.params.userId
  try {
    const deleteUser = await User.destroy({ where: { id } })
    if (deleteUser) {
      res.status(204).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting user', error: error.message })
  }
}

const getMe = async (req, res) => {
  const id = req.userId

  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'email']
    })
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while retrieving the user', error: error.message })
  }
}

module.exports = {
  getAllUser,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getMe
}
