export class MovieRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createTable() {
        const sql =
            `CREATE TABLE IF NOT EXISTS Movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL, 
                external_id INTEGER NOT NULL UNIQUE,
                popularity REAL DEFAULT 0,
                vote_average REAL DEFAULT 0,
                video INTEGER DEFAULT 0,
                vote_count INTEGER DEFAULT 0,
                release_date TEXT,
                original_language TEXT,
                original_title TEXT,
                adult INTEGER DEFAULT 0,
                overview TEXT,
                suggestionScore INTEGER DEFAULT 0,
                addedAt TEXT,
                FOREIGN KEY (user_id) REFERENCES Users(id)
            )`
        return this.dao.run(sql)
    }

    add({ external_id,
        user_id,
        popularity,
        vote_average,
        video,
        vote_count,
        release_date,
        original_language,
        original_title,
        adult,
        overview,
        suggestionScore
    }) {
        return this.dao.run(
            `INSERT INTO Movies (external_id,
                                user_id, 
                                popularity, 
                                vote_average, 
                                video, 
                                vote_count, 
                                release_date, 
                                original_language, 
                                original_title,
                                adult,
                                overview,
                                suggestionScore,
                                addedAt) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,date('now'))`,
            [
                external_id,
                user_id,
                popularity,
                vote_average,
                video,
                vote_count,
                release_date,
                original_language,
                original_title,
                adult,
                overview,
                suggestionScore
            ]);
    }

    exists(external_id) {
        return this.dao.get(
            `SELECT EXISTS(
                SELECT 1 
                    from Movies 
                    WHERE external_id = ? ) as value`,
            [external_id]);
    }

    getUserFavorites(user_id) {
        return this.dao.getAll(
            `SELECT external_id,
                    popularity,
                    vote_average,
                    video,
                    vote_count,
                    release_date,
                    original_language,
                    original_title,
                    adult,
                    overview,
                    suggestionScore,
                    addedAt
                from Movies 
                WHERE user_id = ? `,
            [user_id]);
    }
}

