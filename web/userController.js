const searchUser = require('../dao/searchUser')
let data = '';
let msg = '';
let status = 'fail';

function login(userData, req) {
    searchUser.queryUserByName(userData.userName, result => {
        if (result.length > 0) {
            if (userData.password == result.password ||
                userData.password == result[0].password) {
                data = userData.userName
                msg = '登录成功'
                status = 'success'
            } else {
                data = userData.userName
                msg = '用户密码错误'
                status = 'fail'
            }
        } else {
            data = userData.userName
            msg = '没有这个用户'
            status = 'fail'
        }
        req.send({data,msg,status})
    })
}

function register(userData, req) {
    searchUser.queryUserByName(userData.userName, result => {
        if (result.length == 0) {
            searchUser.addUser(userData, result => {
                if(result.affectedRows){
                    data = userData.userName
                    msg = '注册成功'
                    status = 'success'
                    req.send({data,msg,status})
                }
            })
        }else{
            data = userData.userName
            msg = '用户名重复'
            status = 'fail'
            req.send({data,msg,status})
        }
        
    })
    
}


module.exports = {
    login,
    register
}