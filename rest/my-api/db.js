const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Ganti dengan user MySQL-mu
    password: "", // Ganti dengan password MySQL-mu
    database: "myapi"
});

db.connect(err => {
    if (err) {
        console.error("Koneksi database gagal: ", err);
    } else {
        console.log("Terhubung ke MySQL ✅");
    }
});

module.exports = db;
