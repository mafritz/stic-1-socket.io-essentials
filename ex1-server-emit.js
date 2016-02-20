//Http
var http = require('http');

//Express.js
var express = require('express');
var app = express();

//Create a route for the first http connection
app.get('/', function (request, response) {
    //The file will include the socket.io.js file to establish the socket connection
    response.sendFile(__dirname + '/files/ex1/index.html');
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
    //See the files/ex1/index.html to see how these communications are handled on the client
    //This function will emit a message from the server to all clients connected, saying that a new user has connected
    io.emit('for everyone', 'A new client has joined us!');
    //This function will emit a message just to the client itself
    socket.emit('just for you my socket', 'Welcome to this socket, my Client!');
    //This function will emit a message to every client connected EXCEPT the client itself
    socket.broadcast.emit('for everyone else', 'Psst, the new client cannot read this...');
});

//Listen to the "shared" server (not the Express.js app)
server.listen(3000, console.log("Listening to port 3000"));