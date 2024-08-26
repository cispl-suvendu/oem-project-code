import {
  createPool,
  PoolOptions,
  Pool,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";
import getConfig from "next/config";
import { PassThrough } from "stream";
import { string } from "zod";

interface Config {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
}

export class MySQL {
  private conn: Pool;
  private dbConfig: Config = getConfig().serverRuntimeConfig.dbConfig;

  // private { host : string, port:string, user:string, password:string, database:string } = getConfig().serverRuntimeConfig.dbConfig;

  private credentials: PoolOptions = {
    host: this.dbConfig.host,
    port: this.dbConfig.port,
    user: this.dbConfig.user,
    password: this.dbConfig.password,
    database: this.dbConfig.database,
    waitForConnections: true,
  };

  constructor() {
    
    this.conn = createPool(this.credentials);
    
  }

  /**
   * checking connections
   */

  private checkConnection() {
    if (!this.conn) this.conn = createPool(this.credentials);
  }

  /**
   * For select and Show
   */
  get queryRows() {
    this.checkConnection();
    return this.conn.query.bind(this.conn)<RowDataPacket[]>;
  }

  /**
   *  For `SELECT` and `SHOW` with `rowAsArray` as `true`
   */
  get queryRowsAsArray() {
    this.checkConnection();
    return this.conn.query.bind(this.conn)<RowDataPacket[][]>;
  }

  /** For `INSERT`, `UPDATE`, etc. */
  get queryResult() {
    this.checkConnection();
    return this.conn.query.bind(this.conn)<ResultSetHeader>;
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  get queryResults() {
    this.checkConnection();
    return this.conn.query.bind(this.conn)<ResultSetHeader[]>;
  }

  /** For `SELECT` and `SHOW` */
  get executeRows() {
    this.checkConnection();
    return this.conn.execute.bind(this.conn)<RowDataPacket[]>;
  }

  /** For `SELECT` and `SHOW` with `rowAsArray` as `true` */
  get executeRowsAsArray() {
    this.checkConnection();
    return this.conn.execute.bind(this.conn)<RowDataPacket[][]>;
  }

  /** For `INSERT`, `UPDATE`, etc. */
  get executeResult() {
    this.checkConnection();
    return this.conn.execute.bind(this.conn)<ResultSetHeader>;
  }

  /** For multiple `INSERT`, `UPDATE`, etc. with `multipleStatements` as `true` */
  get executeResults() {
    this.checkConnection();
    return this.conn.execute.bind(this.conn)<ResultSetHeader[]>;
  }

  /** Expose the Pool Connection */
  get connection() {
    return this.conn;
  }
}

// const { host, port, user, password, database } = getConfig().serverRuntimeConfig.dbConfig;
// const pool = mysql.createPool({
//     host, port, user, password, database, waitForConnections: true
// });

// export async function DBConnectionInitialization() {
//     const { host, port, user, password, database } = getConfig().serverRuntimeConfig.dbConfig;

//     try {

//         const db = await mysql.createConnection({
//             host, port, user, password, database, waitForConnections: true
//         });

//         console.log("connection is successfull")

//         return {
//             dbIntilize: true,
//             connection: db
//         }

//     } catch (err) {

//         return {
//             dbIntilize: false,
//             errMsg: err
//         }

//     }
// }

// export async function pushData(userData: {
//     full_name: string,
//     phone_number: string,
//     email: string,
//     password: string

// }) {

//     const user_id = await cryptoRandomStringAsync({ length: 10, type: 'base64' });

//     try {
//         const con = await pool.getConnection();
//         const QUERY = `INSERT INTO users (user_id, full_name, phone_number, email, password) VALUES
//         ('${user_id}', '${userData.full_name}', '${userData.phone_number}', '${userData.email}', '${userData.password}') `;
//         console.log(QUERY);

//         const [rows] = await con.execute(QUERY, (err: any, result: any) => {

//             console.log(err, result);

//         });
//         con.release()

//         console.log(QUERY, rows);

//     } catch (err) {
//         return NextResponse.json({
//             error: err
//         }, { status: 500 })
//     }

// }

// const executeQuery = async (query: string) => {

//     try {
//         const { host, port, user, password, database } = getConfig().serverRuntimeConfig.dbConfig;
//         const db = await mysql.createConnection({
//             host, port, user, password, database, waitForConnections: true
//         });

//         const rows = db.execute(query);

//         return rows

//     } catch (error) {
//         console.log(error);
//     }
// }
