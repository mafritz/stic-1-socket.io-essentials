//Http
var http = require('http');

//Express.js
var express = require('express');
var app = express();

//Create a route for the first http connection --> thihs will be the "public" page for students
app.get('/', function (request, response) {
    //The file will include the socket.io.js file to establish the socket connection
    response.sendFile(__dirname + '/files/ex4/index.html');
});

//Create a route for the teacher (that shall be password protected for example)
app.get('/master', function (request, response) {
    //This file will also include the socket.io.js file 
    response.sendFile(__dirname + '/files/ex4/master.html');
});

//Create a server that will serve both http and socket connection using the app function of Express.js
var server = http.createServer(app);

//Socket.io
//Pass the server to the socket.io to handle socket connection
var io = require('socket.io')(server);

//This function will be executed every time a user connect to the socket through the "/" express route
io.on('connection', function (socket) {
    //When the master updated the code...
    socket.on('master-update', function (code) {
        //Broadcast it to the clients
        socket.broadcast.emit('client-update', code);
    });
});

//Listen to the "shared" server (not the Express.js app)
server.listen(3000, console.log("Listening to port 3000"));