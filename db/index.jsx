import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("address.db")

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("create table if not exists address (id integer primary key not null, image text not null, lat number not null, lng number not null);",
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err)
            })
        })
    })
    return promise;
}

export const insertAddress = (title, image, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("insert into address (title, image, lat, lng) VALUES (?, ?, ?, ?);",
            [title, image, lat, lng],
            (_, result) => resolve(result),
            (_, err) => reject(err))
        })
    })
    return promise;
}

export const fetchAddress = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM address;",
            [],
            (_, result) => resolve(result),
            (_, err) => reject(err))
        })
    })
    return promise;
}