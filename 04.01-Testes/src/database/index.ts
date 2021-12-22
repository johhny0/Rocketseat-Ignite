import { createConnection } from "typeorm";

import { FgGreen } from "../console/Colors";

createConnection().then(() => console.info(`${FgGreen}BD is Connected`));
