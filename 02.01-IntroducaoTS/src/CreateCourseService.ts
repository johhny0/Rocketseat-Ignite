import { Course } from "./Course.entity";


export class CreateCourseService {
    async execute({ name, duration = 8, educator }: Course): Promise<Course> {
        const course: Course = {
            name,
            duration,
            educator
        }

        console.log(course);

        return course;
    }
}