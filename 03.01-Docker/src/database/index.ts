import { createConnection } from "typeorm";

createConnection().then(() => console.info("BD is Connected"));
