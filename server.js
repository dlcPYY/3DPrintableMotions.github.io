let http = require('http');
let url = require('url');
let fs = require('fs');
let querystring = require('querystring');//操作参数模块

function onRequest(request, response) {
    let urlStr = url.parse(request.url);
    let param = querystring.parse(urlStr.query);
    // console.log("收到请求.");
    console.log(param);  
}
http.createServer(onRequest).listen(8888);