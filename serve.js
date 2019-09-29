const express = require('express')
const bodyParser  = require("body-parser");
const loader = require('./node/web/userController')
const app = express()
const jwt  = require('jsonwebtoken')
let secret = 'meituan'
const port = process.env.PORT || 8888
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials','true');
    if (req.method.toLowerCase() === 'options') {
        return res.end();
      }
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended:false})); 
app.use(bodyParser.json())
app.use(express.static('./node/page'))

app.post('/login', (res,req)=>{
    loader.login(res.body,req)
})

app.post('/register', (res,req)=>{
    loader.register(res.body,req)
})
app.get('/validate', (req, res) => {
    loader.validate(req,res)
    // const token = req.headers.authorization;
    // jwt.verify(token, secret, (err, decode) => { // 验证token的可靠性
    //     console.log(token,secret,err,decode)
    //   if (err) {
    //     return res.json({
    //       code: 1,
    //       data: 'token失效了',
    //     });
    //   }
    //   res.json({
    //     username: decode.username,
    //     code: 0, // 延长tokne的过期时间
    //     token: jwt.sign({ username: 'admin' }, secret, {
    //       expiresIn: 20,
    //     }),
    //   });
    // });
  });
app.listen(port, () => {
    console.log(`listening on port ${ port }`);
})
