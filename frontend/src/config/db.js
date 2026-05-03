import mysql from "mysql2";
import 'colors';
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "doctorapp"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed".bgRed.white, err);
    } else {
        console.log("MySQL Connected (XAMPP)".bgMagenta.white);
    }
});

export default db;