const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Ruta GET /cafes", async () => {
    const response = await request(server).get('/cafes').send()
    const {statusCode, body} = response

    expect(statusCode).toBe(200)
    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBeGreaterThan(0)
  })

  it("Ruta DELETE /cafes/:id", async () => {
    const response = await request(server).delete('/cafes/21').send()
    const {statusCode} = response

    expect(statusCode).toBe(404)
  })

  it("Ruta POST /cafes", () => {
    
  })
});
