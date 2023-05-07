const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user.model')
const { createAccessToken } = require('../utils/jwt.util')

const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { email: username } })

    if (user && await bcrypt.compare(password, user.password)) {
      const token = createAccessToken({ sub: user.id })

      return res.status(200).json({ token_type: 'bearer', access_token: token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error login user', error: error.message })
  }
}

const registerUser = async (req, res) => {
  const { username, password } = req.body

  try {
    if (!(username && password)) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const userExists = await User.findOne({ where: { email: username } })

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

    const newUser = await User.create({
      email: username,
      password: passwordHash
    })

    return res.status(201).json({
      message: 'User created',
      userId: newUser.id
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred while creating a user', error: error.message })
  }
}

module.exports = {
  loginUser,
  registerUser
}
