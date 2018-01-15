const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const controller = require('./controller/index');
const env = require('./env');
const path = require('path');

// PARTIE SERVEUR
var SerialPort = require('serialport');

let Readline = SerialPort.parsers.Readline;
let steps = 0;

let serialPort = new SerialPort('/dev/cu.usbmodem1411', {
    baudRate: 9600
});

let parser = new Readline();
serialPort.pipe(parser)


app.set('view engine', 'ejs');
app.set('views', path.resolve(env.path.views));

app.use(express.static(path.resolve(env.path.static)));

app.get('/', controller.site.index);

serialPort.on('open', function () {
    io.on('connection', function (socket) {
        parser.on('data', function (data) {
            // On récupère la valeur et on la transform en String
            let string = data.toString();
            socket.emit('movement_recept', string);
            socket.emit('user_placement', string);
            console.log('Salut');

        });
        socket.on('change_color', function (value) {
            serialPort.write('C');
        });
        socket.on('normal_color', function (value) {
            serialPort.write('B');
        });
    });
});


function test () {
    serialPort.write('Salut');
}
setInterval(test, 1000);

http.listen(env.port, function () {
    console.log('Listening on port ' + env.port + '!')
});