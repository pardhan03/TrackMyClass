import SQLite from 'react-native-sqlite-storage';

//db creation
const db = SQLite.openDatabase({
    name: "trackmyclass.db",
    location: "default"
}, () => {
    console.log('database created succesfully')
}, (err) => {
    console.log(err)
})

//table creation 

export const intiDB = () =>{
    db.transaction((tx)=>{
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                fees INTEGER,
            );
        `);
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS subjects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                course_id INTEGER,
                FOREIGN KEY(course_id) REFERENCES courses(id),
            );
        `)
    })
}

//CRUD

export const insertCourse = (name, fees, success, error) =>{
    db.transaction((tx)=>{
        tx.executeSql(
            'INSERT INTO courses (name, fees) VALUES(?,?)',
            [name, fees],
            (_, res)=>{
                success(res);
            },
            (_, err)=>{
                error(err);
            }
        )
    })
}