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

// let db;

// export const getDBConnection = () => {
//   if (!db) {
//     db = SQLite.openDatabase({ name: 'trackmyclass.db', location: 'default' });
//   }
//   return db;
// };
//table creation 

export const intiDB = () =>{
    // const db = getDBConnection()

    db.transaction((tx)=>{
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS courses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                fees INTEGER
            );
        `);
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS subjects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                course_id INTEGER,
                FOREIGN KEY(course_id) REFERENCES courses(id)
            );
        `)
    })
}

//CRUD

export const insertCourse = (name, fees, success, error) => {
    db.transaction((tx) => {
        // tow avoid duplicate enteries
        tx.executeSql('SELECT * FROM courses WHERE name=?',
            [name],
            (_, {rows}) =>{
                if(rows?.length > 0){
                    error('Course already exists')
                } else{
                    tx.executeSql(
                        'INSERT INTO courses (name, fees) VALUES(?,?)',
                        [name, fees],
                        (_, res) => {
                            success(res);
                        },
                        (_, err) => {
                            error(err);
                        }
                    )
                }
            },
            (_, err) => error(err),
        )
        // tx.executeSql(
        //     'INSERT INTO courses (name, fees) VALUES(?,?)',
        //     [name, fees],
        //     (_, res) => {
        //         success(res);
        //     },
        //     (_, err) => {
        //         error(err);
        //     }
        // )
    },
        err => {
            console.log('Transaction', err)
        }
    )
}

export const getCourses = (callback) =>{
    db.transaction((tx)=>{
        tx.executeSql('SELECT * FROM courses', [], (_,{rows}) => {
            const result = [];
            for(let i=0; i < rows?.length; i++){
                result.push(rows.item(i));
            }
            callback(result);
        })
    })
}

export const deleteCourse = (id, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM courses where id=?',
      [id],
      res => {
        success(res);
      },
      err => {
        error(err);
      },
    );
  });
};

export const updateCourse = (id, newName, newFees, success, error) =>{
    db.transaction((tx)=>{
        tx.executeSql(
            'SELECT * FROM courses WHERE name =? AND id!=?',
            [newName, id],
            (_, {rows})=>{
                if(rows.length>0){
                    error('Course already exist')
                } else{
                    tx.executeSql(
                        'UPDATE courses SET name =? ,fees=? where id=?',
                        [newName, newFees, id],
                        (_, res) => {
                        success(res);
                        },
                        (_, er) => {
                        error(er);
                        },
                    )
                }
            },
            err => {
                error(err);
            },
        )
    })
}