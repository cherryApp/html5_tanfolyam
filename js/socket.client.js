// Socket kapcsolódás.
window.currentSocket = null;

function connectToSocket() {
    window.currentSocket = io('http://127.0.0.1:3000');
    window.currentSocket.on('server_response', function (data) {
        console.log(data);
    });
}

function writeSocket(message) {

    if (window.currentSocket === null)
        connectToSocket();

    var message = document.querySelector(".socket-source").value;

    window.currentSocket.emit('request', {
        "message": message
    });

}