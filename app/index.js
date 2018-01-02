const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const controller = require('./controller/index');
const env = require('./env');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.resolve(env.path.views));
app.use(express.static(path.resolve(env.path.static)));

app.get('/', controller.site.index);

io.on('connection', function (socket) {

    socket.on('change_color', function (value) {
        console.log(value);
    });

});

http.listen(env.port, function () {
    console.log('Listening on port ' + env.port + '!')
});