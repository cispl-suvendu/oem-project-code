import mysql from 'mysql2/promise';
import getConfig from 'next/config';

export async function GET(request: Request) {

    const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

  
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;


    try {

        const db_connection = await mysql.createConnection({
            host: host,

            port: port,

            database: database,

            user: user,

            password: password
        })

        console.log("databse connected successfuly")

    } catch (err) {
        console.log(err);
    }

    return Response.json({ "test": "test" })
}