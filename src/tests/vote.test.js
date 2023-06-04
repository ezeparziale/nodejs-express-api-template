const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Test votes endpoint', () => {
  test('votes on post', async () => {
    const vote = { postId: global.testPost2.id, dir: 1 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .set('Authorization', global.token)
      .expect(201)
  })

  test('votes on post twice', async () => {
    const vote = { postId: global.testPost1.id, dir: 1 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .set('Authorization', global.token)
      .expect(409)
  })

  test('delete votes on post', async () => {
    const vote = { postId: global.testPost1.id, dir: 0 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .set('Authorization', global.token)
      .expect(204)
  })

  test('delete votes on post non exists', async () => {
    const vote = { postId: 999999, dir: 0 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .set('Authorization', global.token)
      .expect(404)
  })

  test('votes on post non exists', async () => {
    const vote = { postId: 999999, dir: 0 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .set('Authorization', global.token)
      .expect(404)
  })

  test('votes on post unauthorized user', async () => {
    const vote = { postId: global.testPost2.id, dir: 1 }
    await api
      .post('/api/v1/votes')
      .send(vote)
      .expect(401)
  })
})
