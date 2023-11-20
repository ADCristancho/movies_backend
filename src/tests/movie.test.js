const request = require("supertest")
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models")

let id;

test('GET /movies', async () => {
    const res = await request(app).get("/movies")
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies', async () => {
    const movie = {
        name: "Avatar",
        image: "https://tse2.mm.bing.net/th?id=OIP.nwqpoKo1JXF6p9tMMX-T7wHaLH&pid=Api&P=0&h=180",
        synopsis: "muy buena pelicula del 1834",
        releaseYear: 1834
    }
    const res = await request(app).post("/movies").send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id', async () => {
    const movie = {
        name: "Avatar updated",
    }
    const res = await request(app).put("/movies/"+id).send(movie)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});


test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Leonardo",
        lastName: "Dicaprio",
        nationality: "Estados Unidos",
        image: "http://img1.wikia.nocookie.net/__cb20101222214322/doblaje/es/images/thumb/1/14/LeonardoDiCaprio.jpg/500px-LeonardoDiCaprio.jpg",
        birthday: 1974,
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Leonardo",
        lastName: "Dicaprio",
        nationality: "Estados Unidos",
        image: "http://img1.wikia.nocookie.net/__cb20101222214322/doblaje/es/images/thumb/1/14/LeonardoDiCaprio.jpg/500px-LeonardoDiCaprio.jpg",
        birthday: 1974,
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name: "Terror"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});