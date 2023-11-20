const request = require("supertest")
const app = require("../app")

let id;

test('GET /actors', async () => {
    const res = await request(app).get("/actors")
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors', async () => {
    const actor = {
        firstName: "Leonardo",
        lastName: "Dicaprio",
        nationality: "Estados Unidos",
        image: "http://img1.wikia.nocookie.net/__cb20101222214322/doblaje/es/images/thumb/1/14/LeonardoDiCaprio.jpg/500px-LeonardoDiCaprio.jpg",
        birthday: "1974-12-10",
    } 
    const res = await request(app).post("/actors").send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test('PUT /actors/:id', async () => {
    const actor = {
        firstName: "Leonardo updated",
    }
    const res = await request(app).put("/actors/"+id).send(actor)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete("/actors/"+id)
    expect(res.status).toBe(204);
});
