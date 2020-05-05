import sqlite3 from 'sqlite3';
import { SqlException } from '../exception/sqlException';

export class Dao {
  constructor() {
    this.db = new sqlite3.Database(process.env.DB_PATH, (err) => {
      if (err) {
        console.error('An error has ocurred connecting to sqlite');
      } else {
        console.log('Connected to sqlite');
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.error(err);
          reject(new SqlException());
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.error(err);
          reject(new SqlException());
        } else {
          resolve(result);
        }
      });
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Closing database connection.');
    });
  }
}