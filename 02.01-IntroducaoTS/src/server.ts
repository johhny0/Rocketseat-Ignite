import express from 'express';
import { createCourse } from './routes';


const app = express();
app.use(express.json());

app.get("/", (request, response) => {
    return response.json({ status: "Connected" })
})

app.get("/courses", createCourse);

app.listen(3333, () => console.log("Server started"))

