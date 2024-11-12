import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from "path";
import { registerAs } from "@nestjs/config";

export default registerAs(
    'dbConfig.dev', 
    () : PostgresConnectionOptions => ({
        url: process.env.DATABASE_URL,
        type: 'postgres',
        port: +process.env.PORT,
        entities: [path.resolve(__dirname, '..')+'/**/*.entity{.ts,.js}'],
        synchronize: true,
}));