import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const UserModel = {
  async getUserByName(username: string) {
    const query: string = "SELECT * FROM users WHERE username = $1";
    const values : string[] = [username];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getUserByID(id: number) {
    const query: string = "SELECT * FROM users WHERE id = $1";
    const values : number[] = [id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async createUser(username: string, email: string, user_password: string): Promise<number> {
    try{
      const firstQuery: string = "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id";
      const firstValues : string[] = [username, email];
      const first_result = await pool.query(firstQuery, firstValues);
      const id: number = first_result.rows[0].id;

      const secondQuery: string = "INSERT INTO user_passwords (user_id, user_password) VALUES ($1, $2)";
      const secondValues : any = [id, user_password];
      const result = await pool.query(secondQuery, secondValues);

      return id;
    }catch(e){
      console.error(e);
      throw e;
    }
  },

  async deleteUser(username: string): Promise<number> {
    try{
      const query: string = "DELETE FROM users WHERE username = $1";
      const values : string[] = [username];
      const result = await pool.query(query, values);
      return 200;
    }catch(e){
      console.error(e);
      throw e;
    }
  },

  async updateUser(id:number = 900000000, username: string, column: string, updateTo: any){
    const columns_allowed: string[] = ["user_password", "username", "email"];
    if (!columns_allowed.includes(column)){
      return 207;
    }

    if (column === "user_password"){
      if(id !== 900000000){
        const query: string = "UPDATE user_passwords SET user_password = $1 WHERE user_id = $2";
        const values : any[] = [updateTo, id];
        const result = await pool.query(query, values);
        return result.rows[0];
      }
    }
    else{
      try{
        const query: string = "UPDATE users SET ${column} = $1 WHERE username = $2";
        const values : string[] = [updateTo, username];
        const result = await pool.query(query, values);
        return 200;
      }catch(e){
        console.error(e);
        throw e;
      }}
  },

  async getUserID(username: string): Promise<number> {
    try{
      const query: string = "SELECT id FROM users WHERE username = $1";
      const values : string[] = [username];
      const result = await pool.query(query, values);
      return result.rows[0].id;
    }catch(e){
      console.error(e);
      throw e;
    }
  },

  async UpdateUserPassword(id: number, password: string): Promise<number> {
    try{
      const query: string = "UPDATE user_passwords SET user_password = $1 WHERE user_id = $2";
      const values : any[] = [password, id];
      const result = await pool.query(query, values);
      return 200;
    }catch(e){
      console.error(e);
      throw(e);
    }
  },

  async getEventID(event_name: string): Promise<number>{
    try{
      const query: string = "SELECT id FROM events WHERE event_name = $1";
      const values : string[] = [event_name];
      const result = await pool.query(query, values);
      return result.rows[0].id;
    }catch(e){
      console.error(e);
      throw e;
    }
  },

  async getEventData(id: number) {
    try{
      const query: string = "SELECT * FROM event_data WHERE id = $1";
      const values : number[] = [id];
      const result = await pool.query(query, values);
      return result.rows;
    }catch(e){
      console.error(e);
      throw e;
    }
  }
}

// Export both the pool and the function
export { pool, UserModel };
