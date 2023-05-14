import { DataSource } from "typeorm"
import { constants } from "../utils/constants"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: constants.database.host,
    port: Number(constants.database.port),
    username: constants.database.username,
    password: constants.database.password,
    database: constants.database.name,
    synchronize: true,
    logging: false,
    entities: [ `${__dirname}/**/entity/*.{ts,js}`],
    migrations: [ `${__dirname}/**/migrations/*.{ts,js}`],
    subscribers: [],
})
