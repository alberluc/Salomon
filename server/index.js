var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline;
let pas = 0;
const dataArduino = [];
const limitArray = 2;


var serialPort = new SerialPort('/dev/cu.usbmodem1411', {
    baudRate: 9600
})

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
    // On récupère la valeur et on la transform en String
    let string = data.toString();
    // On enlève les espaces
    dataArduino.push(string.replace(/(\r\n|\n|\r)/gm,""));
    // Permet d'avoir un tableau avec deux valeurs
    dataArduino.splice(-limitArray.length - 1, dataArduino.length - limitArray);
    // Vérifcation
    if(dataArduino[0] === "Left" && dataArduino[1] === "Right" || dataArduino[0] === "Right" && dataArduino[1] === "Left") {
        pas += 1;
        console.log(pas);
    }
})

serialPort.on('open', function () {
    console.log('Communication is on!')
})