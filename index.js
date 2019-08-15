const express = require('express')
const bodyParser  = require("body-parser");
const loader = require('./web/userController')
const app = express()
const port = process.env.PORT || 8888
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended:false})); 
app.use(bodyParser.json())
app.use(express.static('page'))

app.post('/login', (res,req)=>{
    loader.login(res.body,req)
})

app.post('/register', (res,req)=>{
    loader.register(res.body,req)
})

app.listen(port, () => {
    console.log(`listening on port ${ port }`);
})
