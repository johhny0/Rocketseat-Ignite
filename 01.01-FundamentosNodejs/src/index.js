const express = require('express');

const app = express();
app.use(express.json())

app.get("/", (request, response) => {
    return response.json({ status: "Connected!🔥" })
});

app.get("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"])
})

app.get("/courses/:id", (request, response) => {
    return response.json("Curso 1")
})

app.post("/courses", (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Cursos 4"])
})

app.put("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Cursos 4"])
})

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 3", "Cursos 4"])
})

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Cursos 4"])
})

app.listen(3333, () => console.log("Server is started!"))