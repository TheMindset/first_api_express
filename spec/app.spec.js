const request = require("supertest")
const app = require("../app")

// Database connection
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('api', () => {
  beforeEach(async () => {
    await database.raw('TRUNCATE TABLE papers CASCADE')

    let paper = {
      title: 'Druss the legend',
      author: 'David Gemmell',
      publisher: 'Penguin Random House LLC.'
    }

    await database('papers').insert(paper, 'id')
  })

  afterEach(() => {
    database.raw('TRUNCATE TABLE papers CASCADE')
  })

  describe('Test the root path', () => {
    it('should return a 200', () => {
      return request(app).get("/").then(response => {
        expect(response.statusCode).toBe(200)
      })
    })
  })
})

describe('Test GET /api/v1/papers path', () => {
  it('happy path', async () => {
    const res = await request(app).get("/api/v1/papers")

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)

    expect(res.body[0]).toHaveProperty('title')
    expect(res.body[0].title).toBe('Druss the legend')

    expect(res.body[0]).toHaveProperty('author')
    expect(res.body[0].author).toBe('David Gemmell')
    
    expect(res.body[0]).toHaveProperty('publisher')
    expect(res.body[0].publisher).toBe('Penguin Random House LLC.')
  })
})
