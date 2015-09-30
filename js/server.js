var http = require('http'),
    qs = require('querystring'),
    fs = require('fs');

// Process server data.
function processGetRequest(req, res) {

    console.log(req.url);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
    });

    // Kiolvassuk a fájl tartalmát.
    var contents = fs.readFileSync('json/user.json').toString();
    res.end(contents);

}

http.createServer(function (req, res) {

    // Get request.
    if (req.method === "GET") {
        return processGetRequest(req, res);
    }

    // Post request.
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        var post = JSON.parse(body);
        // console.log(post);

        fs.writeFileSync('json/user.json', JSON.stringify(post.data));

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end('Kapott adatok: ' + JSON.stringify(post));

    });


}).listen(1337, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1337/');