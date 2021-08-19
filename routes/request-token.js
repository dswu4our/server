/*request-token.js*/
var express = require('express');
var router = express.Router();
var request = require('request-promise');

router.post('/', async function(req, res, next) {
    console.log("post");
    var params_from_req = req.body['params'];
  
    var grant = params_from_req['grant_type'];
    var id = params_from_req['client_id'];
    var redir = params_from_req['redirect_uri'];
    var code = params_from_req['code'];
    console.log(code);
    
    const options = {
        uri: "https://kauth.kakao.com/oauth/token",
        method: "POST",
        form:{
            grant_type : grant,
            client_id :id,
            redirect_uri:redir,
            code: code
        },
        headers: {
            "content-type" : "application/x-www-form-urlencoded"
        },
        json: true
    }
    //const cb = await request(option);
    var out = await request(options , function(error, res, body){
        return res;
    })
    console.log(out);
  res.json(out);
});

module.exports = router;