import sqlite3 from 'sqlite3';
import { SqlException } from '../exception/sqlException';

export class Dao {
  constructor() {
    this.db = new sqlite3.Database(process.env.DB_PATH, (err) => {
      if (err) {
        console.error('An error has ocurred connecting to sqlite');
      } else {
        this.db.exec("PRAGMA foreign_keys = ON")
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

  getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
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
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          console.error('An error ocurred closing the db connection.');
          resolve();
        }
        console.log('Closing database connection.');
        resolve();
      });
    });
  }
}