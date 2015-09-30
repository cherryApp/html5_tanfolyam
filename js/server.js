var http = require('http'),
    qs = require('querystring');

// Process server data.
function processData(data) {
    return qs.parse(data);
}

http.createServer(function (req, res) {

    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var post = JSON.parse(body);
        console.log(post);
    });

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });
    res.end('Hello World\n');

}).listen(1337, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1337/');