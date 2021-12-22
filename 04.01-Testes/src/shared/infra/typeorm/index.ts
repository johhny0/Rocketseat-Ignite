import { createConnection } from "typeorm";

import { FgGreen } from "@app/console/Colors";

createConnection().then(() => console.info(`${FgGreen}BD is Connected`));
