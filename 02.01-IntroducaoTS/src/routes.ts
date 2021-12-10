import { Request, Response } from "express";
import { CreateCourseService } from "./CreateCourseService";


export async function createCourse(request: Request, response: Response) {
    const service = new CreateCourseService();

    // const {name, duration, instructor } = request.body;

    // service.execute(name, duration, instructor);

    const curso = service.execute({
        name: "NodeJS",
        educator: "Alguem"
    });

    response.json(curso);
}