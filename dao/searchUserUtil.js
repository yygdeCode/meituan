const mysql = require('mysql')
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: "3306",
    user: 'root',
    password: "123456",
    database: "meituan"
});
const query = (querySql, params, callback) => {
    if (typeof params == 'function') {
        callback = params
        params = null
    }
    pool.getConnection(function (err, connection) {
        connection.query(querySql, params, function (error, result) {
            if (error == null && err == null) {
                callback(result)
            } else {
                console.log(error)
            }
            connection.release();
        });
    });
}




module.exports = query