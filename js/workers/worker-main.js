// Worker kompatibilitás.
if (window.Worker) {

    // Worker indítása.
    var myWorker = new Worker("js/workers/worker.js");


    // Válaszok figyelése.
    myWorker.onmessage = function (e) {
        console.log("Main: ", e.data);
        form1.fillFormData(e.data);
    };

    // Változók a workernek.
    var toWorker = {
        "url": "http://127.0.0.1:1337",
        "command": "getServerData"
    };

    myWorker.postMessage(JSON.stringify(toWorker));

}