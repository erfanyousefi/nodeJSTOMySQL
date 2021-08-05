const mysql = require("mysql");
const db = {
    host: "localhost",
    username: "root",
    password: "",
    name: "node"
}
class ConnectToDB {
    #con;
    #host;
    #username;
    #password;
    #dbName
    constructor(host, username, password, dbName) {
        this.#host = host;
        this.#username = username;
        this.#password = password;
        this.#dbName = dbName
        this.createConnection(this.#host, this.#username, this.#password);
    }
    createConnection(host, user, password) {
        this.#con = mysql.createConnection({ host, user, password })
        this.#con.connect((err) => {
            if (err) {
                console.log(`Connection => Code : ${err.code} - message : ${err.message}`);
            } else {
                console.log("connect to mySQL DB");
                this.createDataBase()
            }
        })
    }
    createDataBase() {
        this.#con.query("show databases", (err, result) => {
            if (err) {
                console.log(`show DB(s) => Code : ${err.code} - message : ${err.message}`);
            } else {
                if (!result.some(db => db.Database === this.#dbName)) {
                    this.#con.query(`create database ${this.#dbName}`, (err, result) => {
                        if (err) {
                            console.log(`createDB Error => Code : ${err.code} - message : ${err.message}`);
                        } else {
                            console.log("DataBase Created => OK 1 DB Created");
                        }
                    })
                }
            }
        })
    }
    dropDB(name) {
        this.#con.query(`drop database ${name}`, (err, result) => {
            if (err) {
                console.log(`createDB Error => Code : ${err.code} - message : ${err.message}`);
            } else {
                console.log(`database removed be successful`);
            }
        })
    }
}
const model = new ConnectToDB(db.host, db.username, db.password, db.name);
model.dropDB("node")