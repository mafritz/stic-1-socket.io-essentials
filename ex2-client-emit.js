//Http
var http = require('http');

//Express.js
var express = require('express');
var app = express();

//Create a route for the first http connection
app.get('/', function (request, response) {
    //The file will include the socket.io.js file to establish the socket connection
    response.sendFile(__dirname + '/files/ex2/index.html');
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
    //This function will emit a message from the server to all clients connected, saying that a new user has connected
    //See the files/ex2/index.html to see how this communication is handled on the client
    io.emit('user connected');

    //This function will be executed when the client send a 'message' event
    socket.on('message', function (data) {
        console.log(socket.id + " says : " + data);
    });
});

//Listen to the "shared" server (not the Express.js app)
server.listen(3000, console.log("Listening to port 3000"));