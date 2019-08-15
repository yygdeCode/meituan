let query = require('./searchUserUtil')

function queryUserByName(stuNum, success) {
    let querySql = 'select * from user where username = ?;';
    query(querySql, stuNum, success)
}

function addUser(userData, success) {
    let querySql = 'insert into user(`userName`,`password`) values(?,?);';
    query(querySql, [userData.userName,userData.password], success)
}


module.exports = {
    queryUserByName,
    addUser
}