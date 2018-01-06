const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const controller = require('./controller/index');
const env = require('./env');
const path = require('path');
/*
// PARTIE SERVEUR
var SerialPort = require('serialport');

let Readline = SerialPort.parsers.Readline;
let steps = 0;
const dataArduino = [];
const limitArray = 2;


let serialPort = new SerialPort('/dev/cu.usbmodem1411', {
    baudRate: 9600
});

let parser = new Readline();
serialPort.pipe(parser)

serialPort.on('open', function () {
    console.log('Communication établi')
});*/

app.set('view engine', 'ejs');
app.set('views', path.resolve(env.path.views));

app.use(express.static(path.resolve(env.path.static)));

app.get('/', controller.site.index);


io.on('connection', function (socket) {

    /*parser.on('data', function (data) {
        // On récupère la valeur et on la transform en String
        let string = data.toString();
        // On enlève les espaces
        dataArduino.push(string.replace(/(\r\n|\n|\r)/gm,""));
        // Permet d'avoir un tableau avec deux valeurs
        dataArduino.splice(-limitArray.length - 1, dataArduino.length - limitArray);
        // Vérifcation
        if(dataArduino[0] === "Left" && dataArduino[1] === "Right" || dataArduino[0] === "Right" && dataArduino[1] === "Left") {
            steps += 1;
            console.log(steps);
            socket.emit('_ovement_ecept', steps);
        }
    });*/

    socket.on('change_color', function (value) {
        console.log(value);
    });

});

http.listen(env.port, function () {
    console.log('Listening on port ' + env.port + '!')
});