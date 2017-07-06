var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

app.get("/", function (req, res) 
    {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile("index.htm", function(err, data) 
    {
        if (err) res.end(err);
        else res.end(data);
    });
});

app.post("/giko", function (req, res) 
{
    var body = "";
    req.on("data", function (data) 
    {
        body += data;
    });
    req.on("end", function () 
    {
        var post = require("querystring").parse(body);
        var userName = post["name"];
        
        var userId = users.addNewUser(userName);
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("fps.htm", function(err, data) 
        {
            if (err) return res.end(err);

            data = String(data).replace(/@USER_NAME@/g, userName)
                               .replace(/@USER_ID@/g, userId);
            res.end(data);
        });
    });
});

app.use(express.static('static'));

//http.listen(80);
http.listen(process.env.OPENSHIFT_NODEJS_PORT || 80, 
            process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

console.log("Server running");
