//Http
var http = require('http');

//Express.js
var express = require('express');
var app = express();

//Create a route for the first http connection
app.get('/', function (request, response) {
    //The file will include the socket.io.js file to establish the socket connection
    response.sendFile(__dirname + '/files/ex0/index.html');
});

//Create a server that will serve both http and socket connection using the app function of Express.js
var server = http.createServer(app);

//Socket.io
//Pass the server to the socket.io to handle socket connection
var io = require('socket.io')(server);

//This function will be executed every time a user connect to the socket through the "/" express route
io.on('connection', function (socket) {
    console.log("A new client connected!");
    //This function will be executed when the user disconnect (i.e. leaves the "/" express route)
    socket.on('disconnect', function (socket) {
        console.log("A client has disconnected!");
    });
});

//Listen to the "shared" server (not the Express.js app)
server.listen(3000, console.log("Listening to port 3000"));