const bcrypt = require('bcrypt')
const { SALT } = require('../configs/general.config')
const User = require('../models/user.model')

const getAllUser = async (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.limit || 20
  const offset = (page - 1) * limit

  try {
    const posts = await User.findAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
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
    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(password, SALT)
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

  const passwordHash = await bcrypt.hash(password, SALT)

  try {
    const user = await User.findByPk(id)

    if (user) {
      if (user.id === req.userId) {
        await User.update(
          {
            email,
            password: passwordHash
          },
          { where: { id } }
        )
        return res.status(200).json({ message: 'User updated' })
      } else {
        return res.status(403).send()
      }
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error updating user', error: error.message })
  }
}

const deleteOneUser = async (req, res) => {
  const id = req.params.userId
  try {
    const user = await User.findByPk(id)
    if (user) {
      if (user.id === req.userId) {
        await User.destroy({ where: { id } })
        return res.status(204).send()
      } else {
        return res.status(403).send()
      }
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error deleting user', error: error.message })
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
