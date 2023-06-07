const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { BACKEND_CORS_ORIGINS } = require('./configs/general.config')
const { swaggerSpec, swaggerUi } = require('./utils/swagger.util')
const authRouter = require('./routes/auth.router')
const postRouter = require('./routes/post.router')
const userRouter = require('./routes/user.router')
const voteRouter = require('./routes/vote.router')
const healthRouter = require('./routes/health.router')

// Middlewares
const corsOptions = {
  origin: BACKEND_CORS_ORIGINS,
  credentials: true,
  methods: '*',
  allowedHeaders: '*'
}
app.use(cors(corsOptions))
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use('/health', healthRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/votes', voteRouter)

app.use((req, res, next) => {
  res.status(404).json({ error: 'Resource not found' })
})

module.exports = app
