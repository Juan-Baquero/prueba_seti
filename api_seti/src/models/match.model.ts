import db from "../config/database";
import { MatchHistory } from "../interfaces/matchHistory.interface";
class matchModel {

  static async getReportDB(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        if (conn) {
          const query = `
          SELECT * FROM match_history
        `;
          conn.query(query, (error, rows) => {
            if (error)
              reject(`An error ocurred in the query getReportDB: ${error}`);
            resolve(rows);
          });

        }

      } catch (error) {
        console.error(
          "An error ocurred getReportDB: ",
          error
        );
        reject(error);
      }
    });
  }

  static async updateMatchDB(
    data: MatchHistory, name_1: string, name_2: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        if (conn) {
          const query = `
          UPDATE match_history SET dates='${data.dates}', count='${data.count}'
           WHERE name_1 = '${name_1}' AND name_2 = '${name_2}';
        `;
          conn.query(query, (error, rows) => {
            if (error)
              reject(`An error ocurred in the query insertMatchDB: ${error}`);
            resolve(rows);
          });

        }

      } catch (error) {
        console.error(
          "An error ocurred insertMatchDB: ",
          error
        );
        reject(error);
      }
    });
  }
  static async insertMatchDB(
    data: MatchHistory
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        if (conn) {
          const query = `
          INSERT INTO match_history  (create_time,name_1,name_2,dates,count,pokemon_1,pokemon_2)
          VALUES ('${data.create_time}', '${data.name_1}', '${data.name_2}',
          '${data.dates}',${data.count},'${data.pokemon_1}','${data.pokemon_2}')
        `;
          conn.query(query, (error, rows) => {
            if (error)
              reject(`An error ocurred in the query insertMatchDB: ${error}`);
            resolve(rows);
          });

        }

      } catch (error) {
        console.error(
          "An error ocurred insertMatchDB: ",
          error
        );
        reject(error);
      }
    });
  }

  static async checkMatchDB(
    pokemon_1: string | undefined,
    pokemon_2: string | undefined
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const conn = await db.connect();
        if (conn) {
          const query = `
          SELECT *
          FROM match_history
          WHERE (name_1 ='${pokemon_1}' AND name_2 ='${pokemon_2}') OR 
          (name_1 ='${pokemon_2}' AND name_2 ='${pokemon_1}')
        `;
          conn.query(query, (error, rows) => {
            if (error)
              reject(`An error ocurred in the query checkMatchDB: ${error}`);
            resolve(rows);
          });

        }

      } catch (error) {
        console.error(
          "An error ocurred checkMatcDB: ",
          error
        );
        reject(error);
      }
    });
  }
}

export default matchModel;
