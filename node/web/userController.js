const searchUser = require('../dao/searchUser')
const jwt = require('jsonwebtoken')

let data = '';
let msg = '';
let status = 'fail';
let token = {}
const secret = 'yyg'
let asd = jwt.sign({userName:'2'},'yyg',{
    expiresIn : 20
})
console.log('asd:'+asd)


function login(userData, req) {
    searchUser.queryUserByName(userData.userName, result => {
        if (result.length > 0) {
            if (userData.password == result.password ||
                userData.password == result[0].password) {
                data = userData.userName
                msg = '登录成功'
                status = 'success'
                console.log(data,typeof data)
                token = jwt.sign({userName:data},secret,{
                    expiresIn : 20
                })
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
        req.json({data,msg,status,token})
    })
}
function validate(req,res){
    const token = req.headers.authorization;
    
    jwt.verify(token, secret, (err, decode) => { // 验证token的可靠性
        console.log("aaa:"+ token,decode)
      if (err) {
        //   console.log('失效')
        return res.json({
          code: 1,
          data: 'token失效了',
        });
      }
      res.json({
        username: decode.userName,
        code: 0, // 延长tokne的过期时间
        token
      });
    });
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
            req.json({data,msg,status})
        }
        
    })
    
}


module.exports = {
    login,
    register,
    validate
}