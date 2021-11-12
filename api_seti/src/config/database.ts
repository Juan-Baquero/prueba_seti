import * as mysql from 'mysql';
require('dotenv').config();

let connection: mysql.Pool;

const connect = async () => {
  try {
    if (connection) return connection;
    else {
      const sqlConfig: mysql.PoolConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),       
     
      }
  
      connection = mysql.createPool(sqlConfig);
      connection.getConnection((error) => {
        if (error) { console.log(`There's an error: ${error}`) }
        else {
          connection.query(
            `SELECT NOW() AS dateNow`,
            (error, rows) => {
              if (error)
                console.log(
                  `An error ocurred in the query getPrincipalDB: ${error}`
                );
              console.log(`Database connect at: ${rows[0].dateNow}`);
            }
          );
        
        }
        
        
      });
      return connection;
    }
   
  } catch (error) {
    console.log(`Error in connect: ${error}`);
    throw error;
  }
}

export default {
  connect
}