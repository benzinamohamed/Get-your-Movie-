import * as SQLite from 'expo-sqlite';

export const connectToDb = async () => {
    try {
        return await SQLite.openDatabaseAsync("MyMoviesDB", { useNewConnection: true });
    } catch (error) {
        console.log("Problem connecting to Db", error);
    }
};

export const createTable = async () => {
    try {
        const db = await connectToDb();
        await db.execAsync(`CREATE TABLE IF NOT EXISTS likedMovies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, overview TEXT);`);
    } catch (error) {
        console.log("Error creating table", error);
    }
};

export const insertToDb = async (title, overview,setMount) => {
    try {
        const db = await connectToDb();
        await db.withTransactionAsync(async () => {
            await db.runAsync('INSERT INTO likedMovies (title, overview) VALUES (?, ?)', [title, overview]);
        });
        setMount((prev)=>(!prev))
    } catch (error) {
        console.log("Error inserting data", error);
    }
};

export const deleteFromDb = async (title,setMount) => {
    try {
        const db = await connectToDb();
        await db.withTransactionAsync(async () => {
            await db.runAsync('DELETE FROM likedMovies WHERE title = ?', [title]);
        });
        setMount((prev)=>(!prev))
    } catch (error) {
        console.log("Error deleting data", error);
    }
};

export const getAllFromDb = async () => {
    try {
        const db = await connectToDb();
        const allRows = await db.getAllAsync('SELECT * FROM likedMovies');
        return allRows;
    } catch (error) {
        console.log("Error getting all data", error);
    }
};

export const isThere = async (title) => {
    try {
        const db = await connectToDb();
        const result = await db.getFirstAsync('SELECT title FROM likedMovies WHERE title = ?', [title]);
        return result;
    } catch (error) {
        console.log("Error selecting data", error);
    }
};