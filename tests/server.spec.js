const request = require("supertest");
const server = require("../index");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const {SECRET} = process.env

describe("Operaciones CRUD de cafes", () => {
  it("Ruta GET /cafes", async () => {
    const response = await request(server)
      .get('/cafes')
      .send()

    const {statusCode, body} = response

    expect(statusCode).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBeGreaterThan(0)
  })

  it("Ruta DELETE /cafes/:id", async () => {
    const token = jwt.sign({email: "admin@correo.cl"}, SECRET)
    const response = await request(server)
      .delete('/cafes/21').send()
      .set('Authorization', `Bearer ${token}`)

    const {statusCode} = response

    expect(statusCode).toBe(404)
  })

  it("Ruta POST /cafes", async () => {
    const cafe = {
      id: 95,
      nombre: "Expreso"
    }

    const response = await request(server)
      .post('/cafes')
      .send(cafe)

    const {statusCode, body} = response

    expect(statusCode).toBe(201)
    expect(body).toContainEqual(cafe)
  })

  it("Ruta PUT /cafes/:id", async () => {
    const cafe = {
      id: 157,
      nombre: "Latte"
    }

    const response = await request(server)
      .put('/cafes/2')
      .send(cafe)

    const {statusCode, body} = response

    expect(statusCode).toBe(400)
    expect(body).not.toContainEqual(cafe)
  })
});
