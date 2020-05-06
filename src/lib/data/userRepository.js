export class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                password TEXT NOT NULL
            )`
        return this.dao.run(sql)
    }

    add({ email, firstName, lastName, password }) {
        return this.dao.run(
            `INSERT INTO Users (email, 
                                firstName, 
                                lastName, 
                                password) 
                                VALUES (?, ?, ?, ?)`,
            [
                email,
                firstName,
                lastName,
                password
            ]);
    }

    exists(email) {
        return this.dao.get(
            `SELECT EXISTS(
                    SELECT 1 
                    from Users 
                    WHERE email = ? ) as value`,
            [email]);
    }

    get(email) {
        return this.dao.get(
            `SELECT * 
                from Users 
                WHERE Email = ?`,
            [email]);
    }
}

