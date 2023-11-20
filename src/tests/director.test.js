const request = require("supertest")
const app = require("../app")

let id;

test('GET /directors ', async () => {
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test('POST /directors', async () => {
    const director = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "Canadá",
        image: "https://static.hollywoodreporter.com/sites/default/files/2014/04/james_cameron_-_h_-_2014.jpg.jpg",
        birthday: "1974-12-10"
    }
    const res = await request(app).post('/directors').send(director);
    
    id = res.body.id;

    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test('PUT /directors/:id', async () => {
    const director = { 
     firstName: "James updated"
    }
    const res = await request(app).put("/directors/"+id).send(director);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});


test('DELETE /genres/:id', async () => {
    const res = await request(app).delete("/genres/"+id)
    expect(res.status).toBe(204);
});