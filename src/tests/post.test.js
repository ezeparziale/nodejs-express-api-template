const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Test Post endpoint', () => {

  test('get all posts', async () => {
    const resp = await api
      .get('/api/v1/posts')
      .set('Authorization', global.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Array.isArray(resp.body)).toBeTruthy()
    expect(resp.body.length).toBe(1)
  })

  test('get all posts unauthorized user', async () => {
    await api
      .get('/api/v1/posts')
      .expect(401)
  })

  test('get one post unauthorized user', async () => {
    await api
      .get('/api/v1/posts/1')
      .expect(401)
  })

  test('get one post non exists', async () => {
    await api
      .get('/api/v1/posts/9999999')
      .set('Authorization', global.token)
      .expect(404)
  })
})
