var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT || 7000;

// peer_server

var ExpressPeerServer = require('peer').ExpressPeerServer;
var peerExpress = require('express');
var peerApp = peerExpress();
var peerServer = require('http').createServer(peerApp);

var options = { debug: true }
var peerPort = 9000;

app.get('/connected-people', function (req, res) {
  return res.json(connected);
});

app.get('*', function(req, res){
    res.sendFile(__dirname + req.url);
});

var connected = [];
server.on('connection', function (id) {
  var idx = connected.indexOf(id); // only add id if it's not in the list yet
  if (idx === -1) {connected.push(id);console.log(id);}

});
server.on('disconnect', function (id) {
  var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
  if (idx !== -1) {connected.splice(idx, 1);}
});


peerApp.use('/index', ExpressPeerServer(peerServer, options));

server.listen(port);
peerServer.listen(peerPort);