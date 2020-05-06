export class TokenRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS Tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                token TEXT NOT NULL
            )`
        return this.dao.run(sql)
    }

    add(token) {
        return this.dao.run(
            `INSERT INTO Tokens (token)
                                VALUES (?)`,
            [token]);
    }

    exists(token) {
        return this.dao.get(
            `SELECT EXISTS(
                    SELECT 1 
                    from Tokens 
                    WHERE token = ? ) as value`,
            [token]);
    }
}

