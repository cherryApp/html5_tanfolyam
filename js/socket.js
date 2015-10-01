var io = require('socket.io')();
io.on('connection', function (socket) {
    socket.on('request', function (data) {
        console.log(data);
        socket.emit('server_response', {
            "my_data": data
        });
        var _to = setTimeout(function () {
            clearTimeout(_to);
            socket.emit('server_response', {
                "delayed_data": data
            });
        }, 5000);
    });
});
io.listen(3000);

console.log("Server running at 127.0.0.1:3000");