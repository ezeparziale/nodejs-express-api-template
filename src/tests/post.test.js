const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Test posts endpoint', () => {
  test('get all posts', async () => {
    const resp = await api
      .get('/api/v1/posts')
      .set('Authorization', global.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(Array.isArray(resp.body)).toBeTruthy()
    expect(resp.body.length).toBe(3)
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

  test('get one post', async () => {
    const resp = await api
      .get(`/api/v1/posts/${global.testPost1.id}`)
      .set('Authorization', global.token)
      .expect(200)

    expect(resp.body.id).toBe(global.testPost1.id)
    expect(resp.body.title).toBe(global.testPost1.title)
  })

  test.each([
    ['Titulo 1', 'Contenido 1', true],
    ['Titulo 2', 'Contenido 2', false]
  ])('create post', async (title, content, published) => {
    const resp = await api
      .post('/api/v1/posts/')
      .send({ title, content, published })
      .set('Authorization', global.token)
      .expect(201)

    expect(typeof resp.body.postId).toBe('number')
  })

  test('create post default published false', async () => {
    const resp = await api
      .post('/api/v1/posts/')
      .send({ title: 'Title 3', content: 'Content 3' })
      .set('Authorization', global.token)
      .expect(201)

    expect(typeof resp.body.postId).toBe('number')

    const respCheck = await api
      .get(`/api/v1/posts/${resp.body.postId}`)
      .set('Authorization', global.token)
      .expect(200)

    expect(respCheck.body.published).toBe(false)
  })

  test('create post unauthorized user', async () => {
    await api
      .post('/api/v1/posts/')
      .send({ title: 'Title X', content: 'Content X' })
      .expect(401)
  })

  test('delete post unauthorized user', async () => {
    await api
      .delete(`/api/v1/posts/${global.testPost1.id}`)
      .expect(401)
  })

  test('delete post success', async () => {
    await api
      .delete(`/api/v1/posts/${global.testPost1.id}`)
      .set('Authorization', global.token)
      .expect(204)
  })

  test('delete post non exists', async () => {
    await api
      .delete('/api/v1/posts/999999')
      .set('Authorization', global.token)
      .expect(404)
  })

  test('delete post other user', async () => {
    await api
      .delete(`/api/v1/posts/${global.testPost2.id}`)
      .set('Authorization', global.token)
      .expect(403)
  })

  test('update post', async () => {
    const newData = { title: 'New title', content: 'New content', published: true }
    await api
      .put(`/api/v1/posts/${global.testPost3.id}`)
      .send(newData)
      .set('Authorization', global.token)
      .expect(200)

    const respCheck = await api
      .get(`/api/v1/posts/${global.testPost3.id}`)
      .set('Authorization', global.token)
      .expect(200)

    expect(respCheck.body.title).toBe(newData.title)
    expect(respCheck.body.content).toBe(newData.content)
    expect(respCheck.body.published).toBe(newData.published)
  })

  test('update post other user', async () => {
    const newData = { title: 'New title', content: 'New content', published: true }
    await api
      .put(`/api/v1/posts/${global.testPost2.id}`)
      .send(newData)
      .set('Authorization', global.token)
      .expect(403)
  })

  test('update post unauthorized user', async () => {
    const newData = { title: 'New title', content: 'New content', published: true }
    await api
      .put(`/api/v1/posts/${global.testPost2.id}`)
      .send(newData)
      .expect(401)
  })

  test('update post non exists', async () => {
    const newData = { title: 'New title', content: 'New content', published: true }
    await api
      .put('/api/v1/posts/99999')
      .send(newData)
      .set('Authorization', global.token)
      .expect(404)
  })
})
