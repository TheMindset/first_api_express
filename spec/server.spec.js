const request = require("supertest")
const app = require("../app")

describe('Test the root path', () => {
  test('It should respond to the get method', async () => {
    const res = await request(app).get("/")

    expect(res.statusCode).toBe(200)
  })
})
