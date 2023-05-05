const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { swaggerSpec, swaggerUi } = require('./utils/swagger')
const authRouter = require('./routes/auth.router')
const postRouter = require('./routes/post.router')
const userRouter = require('./routes/user.router')
const voteRouter = require('./routes/vote.router')

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf)
    } catch (e) {
      res.status(400).json({ message: 'Invalid JSON' })
    }
  }
}))

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/votes', voteRouter)

module.exports = app
