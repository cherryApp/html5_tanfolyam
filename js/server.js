var http = require('http'),
    qs = require('querystring'),
    fs = require('fs');

// Process options request.
function processOptionsRequest(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    // res.end('Kapott adatok: ' + JSON.stringify(post));
    res.end('Kapott adatok: ');
}

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

// Process post.
function processPost(req, res) {

    // Post request.
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {

        var post = JSON.parse(body);
        // console.log(post);

        fs.writeFileSync('json/user.json', JSON.stringify(post));

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end('Kapott adatok: ' + JSON.stringify(post));
        // res.end('Kapott adatok: ');

    });

}

http.createServer(function (req, res) {

    // Option kérés kiszolgálása.
    if (req.method === "OPTIONS") {
        return processOptionsRequest(req, res);
    };

    // Get request.
    if (req.method === "GET") {
        return processGetRequest(req, res);
    }

    if (req.method === "POST") {
        return processPost(req, res);
    }


}).listen(1337, "127.0.0.1");


console.log('Server running at http://127.0.0.1:1337/');