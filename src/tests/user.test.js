const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Test users endpoint', () => {
  test('get all users', async () => {
    const resp = await api
      .get('/api/v1/users')
      .set('Authorization', global.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Array.isArray(resp.body)).toBeTruthy()
    expect(resp.body.length).toBe(2)
  })

  test('get all users unauthorized user', async () => {
    await api
      .get('/api/v1/users')
      .expect(401)
  })

  test('get one user unauthorized user', async () => {
    await api
      .get('/api/v1/users/1')
      .expect(401)
  })

  test('get one user non exists', async () => {
    await api
      .get('/api/v1/users/9999999')
      .set('Authorization', global.token)
      .expect(404)
  })

  test('get one user', async () => {
    const resp = await api
      .get(`/api/v1/users/${global.testUser1.id}`)
      .set('Authorization', global.token)
      .expect(200)

    expect(resp.body.email).toBe(global.testUser1.email)
  })

  test('get me user', async () => {
    const resp = await api
      .get('/api/v1/users/me')
      .set('Authorization', global.token)
      .expect(200)

    expect(resp.body.id).toBe(global.testUser1.id)
    expect(resp.body.email).toBe(global.testUser1.email)
  })

  test.each([
    ['asd@gmail.com', '12345678', 201],
    ['no_email', '123456780', 422],
    [null, null, 422],
    ['testUser1@example.com', '12345678', 409]
  ])('create user', async (email, password, statusCode) => {
    const resp = await api
      .post('/api/v1/users/')
      .send({ email, password })
      .set('Authorization', global.token)
      .expect(statusCode)

    if (resp.ok) {
      expect(typeof resp.body.userId).toBe('number')
    }
  })

  test('create user unauthorized user', async () => {
    await api
      .post('/api/v1/users/')
      .send({ email: 'unauthorized_user@mail.com', password: '12345678' })
      .expect(401)
  })

  test('update user', async () => {
    const newData = { email: 'new_email@mail.com', password: '12345678' }
    await api
      .put(`/api/v1/users/${global.testUser1.id}`)
      .send(newData)
      .set('Authorization', global.token)
      .expect(200)
  })

  test('update user other user', async () => {
    const newData = { email: 'new_email@mail.com', password: '12345678' }
    await api
      .put(`/api/v1/users/${global.testUser2.id}`)
      .send(newData)
      .set('Authorization', global.token)
      .expect(403)
  })

  test('update user unauthorized user', async () => {
    const newData = { email: 'new_email@mail.com', password: '12345678' }
    await api
      .put(`/api/v1/users/${global.testUser2.id}`)
      .send(newData)
      .expect(401)
  })

  test('update user non exists', async () => {
    const newData = { email: 'new_email@mail.com', password: '12345678' }
    await api
      .put('/api/v1/users/99999')
      .send(newData)
      .set('Authorization', global.token)
      .expect(404)
  })

  test('delete user unauthorized user', async () => {
    await api
      .delete(`/api/v1/users/${global.testUser2.id}`)
      .expect(401)
  })

  test('delete user success', async () => {
    await api
      .delete(`/api/v1/users/${global.testPost1.id}`)
      .set('Authorization', global.token)
      .expect(204)
  })

  test('delete user non exists', async () => {
    await api
      .delete('/api/v1/users/999999')
      .set('Authorization', global.token)
      .expect(404)
  })

  test('delete user other user', async () => {
    await api
      .delete(`/api/v1/users/${global.testUser2.id}`)
      .set('Authorization', global.token)
      .expect(403)
  })
})
