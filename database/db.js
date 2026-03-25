const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db",(err)=>{
    if(err){
        console.log("Db error: ", err.message);
    }else{
        console.log("Db connected to sqlite3");
    }
});


db.run(`
    create table if not exists users(
    id integer primary key autoincrement,
    name text,
    email text unique,
    age integer
    )
    `)
module.exports = db;