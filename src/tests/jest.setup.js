const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const db = require('../configs/db.config')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const Vote = require('../models/vote.model')

const saltRounds = 10

const userTest1 = {
  email: 'testUser1@example.com',
  password: '123456'
}

const userTest2 = {
  email: 'testUser2@example.com',
  password: '123456'
}

const postTest1 = {
  title: 'Test title 1',
  content: 'Test content 1'
}

beforeAll(async () => {
  await db.sync({ force: true })

  // Create users
  const passwordHash1 = await bcrypt.hash(userTest1.password, saltRounds)
  const newUserTest1 = await User.create({
    email: userTest1.email,
    password: passwordHash1
  })
  await newUserTest1.reload()

  const passwordHash2 = await bcrypt.hash(userTest2.password, saltRounds)
  const newUserTest2 = await User.create({
    email: userTest2.email,
    password: passwordHash2
  })
  await newUserTest2.reload()

  // Create post
  const newPostTest = await Post.create({
    title: postTest1.title,
    content: postTest1.content,
    authorId: newUserTest1.id
  })
  await newPostTest.reload()

  // Create votes
  await Vote.create({
    userId: newUserTest1.id,
    postId: newPostTest.id
  })

  await Vote.create({
    userId: newUserTest2.id,
    postId: newPostTest.id
  })

  const response = await api
    .post('/api/v1/auth/login')
    .send(
      {
        username: userTest1.email,
        password: userTest1.password
      }
    )
  global.token = response.body.access_token
})

afterAll(async () => {
  db.close()
})
