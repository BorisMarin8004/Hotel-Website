const mysql = require('mysql');
const pool = dbConnection();

//functions
async function executeSQL(sql, params){
    return new Promise (function (resolve, reject) {
        pool.query(sql, params, function (err, rows, fields) {
            if (err) throw err;
            resolve(rows);
        });
    });
}//executeSQL

function dbConnection(){
    const pool  = mysql.createPool({
        connectionLimit: 10,
        host: "qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "yo6stpfpuea7xelv",
        password: "ixza1jduzcsx7bfv",
        database: "jhgdj5vjfmu4x4yk"

    });
    return pool;
} //dbConnection

module.exports = {executeSQL, dbConnection};