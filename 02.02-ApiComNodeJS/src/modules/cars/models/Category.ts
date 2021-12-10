import { v4 as uuidV4 } from "uuid";

export class Category {
    id: string;
    name: string;
    description: string;
    create_at: Date;

    constructor() {
        console.log("new category");
        this.id = uuidV4();
        this.create_at = new Date();
    }
}
