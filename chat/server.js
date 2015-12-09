
var express   = require('express');
var session   = require('express-session');
var cookieParser = require('cookie-parser');
var session = require('client-sessions');
var fs        = require('fs');
var cert = {
  key: fs.readFileSync('/etc/httpd/ssl/fdc-signal/STAR_inn-devel_com/inn-devel.key'),
  cert: fs.readFileSync('/etc/httpd/ssl/fdc-signal/STAR_inn-devel_com/STAR_inn-devel_com.crt'),
  ca: fs.readFileSync('/etc/httpd/ssl/fdc-signal/STAR_inn-devel_com/STAR_inn-devel_com.cer')
};
var PeerServer = require('peer').PeerServer;
var mysql     = require("mysql");
var app       = express();
var bodyParser = require('body-parser');
var https      = require('https').createServer(cert,app);
var io        = require("socket.io")(https);
var chat      = require('./app/models/message');
var server = PeerServer({port: 5000, path: '/', proxied: false, ssl:cert});
var port      = 4501;

app.set('views', __dirname + '/app/views');
app.set('view engine', "html");
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

var router    = express.Router(); 
var sess;
var rooms = ['room1', 'room2', 'room3'];
var connected = [];
var usernames = {};

//-------------Peer--------------------


/*var peerExpress = require('express');
var peerApp = peerExpress();*/

/*var options = { debug: true}
var peerPort = 5000;

peerServer.on('connection', function (id) {
  var idx = connected.indexOf(id); // only add id if it's not in the list yet
  if (idx === -1) {connected.push(id);}
});
peerServer.on('disconnect', function (id) {
  var idx = connected.indexOf(id); // only attempt to remove id if it's in the list
  if (idx !== -1) {connected.splice(idx, 1);}
});
router.get('/connected-people', function (req, res) {
  console.log(connected);
});*/
var options = { debug: true}
// router.use('/peerjs', PeerServer(server, options));

//peerServer.listen(peerPort);

//-----------end peer--------------------


app.use('/', router);
router.use(function(req, res, next) {
  sess=req.session;
  console.log('Something is happening.');
  next();
});

https.listen(app.listen(port)); //listen to port

/*index get*/
router.get("/", function(req, res){
  if (sess.loggedin) {
    chat.users.findAll({
      where:{  
        id: {ne : sess.loggedin.id}
      }
    }).then(function(result) {
      if (result) {
        res.render('index', {data:result, user : sess.loggedin.username, uid: sess.loggedin.username});
      } else {
        res.render("login");
      }
     
    });
  } else {
    res.render("login");
  }
});

/*index post*/
router.post("/", function(req, res){
  chat.users.find({
    where: {
      username: req.body.username,
      password: req.body.password
    }

  }).then(function(result) {
    sess.loggedin = result;
      if (result) {
        chat.users.findAll({
          where:{  
            username: {ne : sess.loggedin.username}
          }
        }).then(function(result) {
          res.render('index', {data:result, user : sess.loggedin.username, uid: sess.loggedin.username});
        });
      } else {
        console.log('invalid user');
      }
  });
});

router.route('/video')
  .post(function(req, res){
    if (sess.loggedin.username) {
      res.render('video');
    } else {
      res.render("/login");
    }
  })

  .get(function(req, res){
    if (sess.loggedin.username) {
      res.render('video', {user: sess.loggedin.username});
    } else {
      res.render("/login");
    }
  });

router.get("/gvideo", function(req, res){
  if (sess.loggedin.username) {
    res.render('gvideo');
  } else {
    res.render("login");
  }
});

/*All conversation*/
router.get("/chat", function(req, res){
    if (sess.loggedin) {
      chat.tblchats.findAll().then(function(result) {
        res.render("page", {data:result,user:sess.loggedin.username});
      });
    } else {
      res.redirect('/');
    } 
});

router.route('/regist')
  .post(function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    chat.users.findOne({
      where : {username:username}
    }).then(function(result){
      if (result) {
        res.send('username taken');
      } else {
        chat.users.create({
          username : username,
          password : password
        }).then(function(){
          res.send('Successfully registered. Please login using your account.<a href="/">Click here to login</a>');
        });
      }
    });
  })

  .get(function(req, res){
    res.render("regist"); 
  });

router.get("/conversation", function(req, res){
  //console.log(sess.loggedin.username);
    res.render("chat");
});

router.get("/logout", function(req, res){
  req.session.reset();
  res.redirect('/');
});

io.sockets.on('connection', function (socket) {

  socket.on('showpm', function (data) {
    var toid = data.toid;
    var cuid = data.cuid;
    var touser = data.touser;

    chat.pmessages.findAll({
      where: {
        $or: [{uid:cuid,toid: toid}, {toid: cuid, uid:toid}],

      },
      order: [["updatedAt","DESC"]]
          
    }).then(function(result) {
      io.sockets.emit('dispConvo', {result:result, toid:toid, cuid:cuid, touser: touser});  
      socket.emit('updatechat', 'SERVER', 'you have connected to room1');
      socket.broadcast.to('room1').emit('updatechat', 'SERVER', toid + ' has connected to this room');
    });
      
  });

  socket.on('addConvo', function (data) {
    var toid = data.toid;
    var cuid = data.cuid;
    var message = data.message;
    var chatrand = data.chatrand;

    io.sockets.emit('message', data);

    if (data) {
      chat.pmessages.create({
        uid: cuid,
        toid: toid,
        message: message,
        chatrand: chatrand
      })
    }
  });

  socket.on('savetochathistory', function (data){
    var rand = data.chatrand;

    if (data) {
      chat.hashchats.create({
        rand:rand
      });
    }
  });

  socket.on('saveStat', function (data){
    io.sockets.emit('post', data);
    if (data) {
      var username = data.username;
      var message = data.message;
      chat.newsfeeds.create({
        username: username,
        message: message
      }).then(function(result){
        socket.broadcast.emit("notify", data);
      });
    }
  });

  socket.on('dispNewsFeed', function(data){
    if (data) {
      var username = data.username;
      chat.newsfeeds.findAll({
        username: username,
        order: [["updatedAt","DESC"]]
      }).then(function(result){
        socket.emit('showNF', {result:result});
      });
    }
  });

  socket.on('send', function (data) {
    io.sockets.emit('message', data);
    if (data) {
      chat.tblchats.create({
        text : data.message,
        username : data.username
      });
      console.log('chat added');
    }
  });

  socket.on('savePeer', function (data) {
      if (data) {
        chat.users.findOne({
          where: {
            username:data.userID
          }
        }).then(function(result){
          result.updateAttributes({
              username : data.userID,
              peer : data.peer
          });
            console.log('peer updated');
        });
      }  
  });

  socket.on('showPeer', function () {
    chat.users.findAll({
      attributes: ['peer','username'],
      where: {
        room : socket.room
      }
    }).then(function(result){
      io.sockets.emit('peerList', result);
    });
  });

  socket.on('getpeer', function (data){
    chat.users.findOne({
      where: {
        peer: data.peer
      }
    }).then(function(result){
      socket.emit('showIndipeer', result);
    });
  });

  socket.on('deletePeer', function(data){
    if (data) {
        chat.users.findOne({
          where: {
            username:data.userID
          } 
        }).then(function(result){
          result.updateAttributes({
              username : data.userID,
              peer : ''
          });
            console.log('peer updated');
        });
      }  
  });

  //create room
  socket.on('create', function(room) {
    if(rooms.indexOf(room)==-1){
      rooms.push(room);
      io.sockets.emit('updaterooms', rooms, socket.room);
    } else {
      console.log('exist');
    }
  });

  //sort room
  socket.on('sortroom', function(){
    rooms.sort();
    socket.emit('updaterooms', rooms, socket.room);
  });

  //join room
  socket.on('joinUser', function(data){
    var username = data.username;
    socket.username = username;
    //socket.room = 'room1';
    usernames[username] = username;
    //socket.join('room1');
    //socket.emit('updatechat', 'SERVER', 'you have connected to room1');
    //socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
    socket.emit('updaterooms', rooms, 'none');
    socket.emit('showPeer');
    chat.users.findOne({
      where: {
        username:username
      } 
    }).then(function(result){
      result.updateAttributes({
        username : username,
        room : socket.room
      });
    });
  });

  //switch room
  socket.on('switchRoom', function(data){
    socket.leave(socket.room);
    socket.join(data);
    socket.emit('updatechat', 'SERVER', 'you have connected '+data);
    socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
    socket.room = data;
    socket.broadcast.to(data).emit('updatechat', 'SERVER', socket.username+' has joined this room');
    socket.emit('updaterooms', rooms, data);

    chat.users.findOne({
      where: {
        username: socket.username
      } 
    }).then(function(result){
      result.updateAttributes({
        username : socket.username,
        room : socket.room
      });
    });
  });

  socket.on('disconnect', function(){
    if (socket.username) {
      delete usernames[socket.username];
      io.sockets.emit('updateusers', usernames);
      socket.broadcast.emit('updatechat', 'SERVER', '<font style="color:#ff3333">' + socket.username + ' has been disconnected from the server</font>');
      socket.leave(socket.room);
    }
  });

  socket.on('discon', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has ended the chat');
    socket.leave(socket.room);

    chat.users.findOne({
      where: {
        username:socket.username
      } 
    }).then(function(result){
      result.updateAttributes({
          username : socket.username,
          peer : '',
          room : ''
      });
        console.log('peer updated');
    });
  });

  socket.on('checkIfDiscon', function(data){
    var username = data.username;

    //check if got peer
    chat.connections.findOne({
      where:{
        peer1:username,
        status:'disconnected'
      }
    }).then(function(result){
      if (result) {
        if (result.peer2 != '...' && result.peer1 != '...') {
          chat.users.findOne({
            where: {
              username: result.peer2
            }
          }).then(function(res){
            if (res) {
              socket.emit('reconnectTopeer', {res:res, starttime:result.createdAt});
              socket.broadcast.emit('updatechat', 'SERVER', username + ' is reconnected to the server');
              socket.emit('updatechat', 'SERVER', 'You are now reconnected');
              socket.join(res.room);

              chat.hashchats.findOne({
                where: {
                  rand:res.dc_code
                }
              }).then(function(r){
                socket.emit('getStarttime', r.starttime);
              });

              chat.connections.findOne({
                where: {
                  peer1:username, peer2:result.peer2
                }
              }).then(function(output){
                output.updateAttributes({
                  status: 'online'
                });
              });

              chat.connections.findOne({
                where: {
                  peer1:result.peer2, peer2:username
                }
              }).then(function(output){
                output.updateAttributes({
                  status: 'online'
                });
              });
            }
          });
        }
      }
    });
    /*chat.users.findOne({
      where: {
        username: username,
        status: 9
      } 
    }).then(function(result){
      if (result.peer) {
        socket.emit('reconnectTopeer', result);
        socket.broadcast.emit('updatechat', 'SERVER', data.username + ' is reconnecting to the server');
        socket.emit('updatechat', 'SERVER', 'Reconnecting...');
        socket.join(result.room);

        chat.hashchats.findOne({
          where: {
            rand:result.dc_code
          }
        }).then(function(res){
          socket.emit('getStarttime', res.starttime);
        });
      }
    });*/
  });

  socket.on('saveDisconPeer', function(data){
    var peer = data.peer;
    var host = data.hostid;
    var token = data.token;
    var status = data.status;

    chat.users.findOne({
      where: {
        peer: host
      }
    }).then(function(result){
      result.updateAttributes({
        peer: peer,
        dc_code: token,
        status: status
      });
    });
  });

  socket.on('updateChatTime', function(token){
    var time = getCurrentTime();

    chat.hashchats.findOne({
      where: {
        rand: token
      }
    }).then(function(result){
      result.updateAttributes({
        endtime: time
      });
    });
  })

  socket.on('giveChatToken', function(data){
    var chatrand = data;
    var time = getCurrentTime();

    chat.hashchats.create({
      rand: chatrand,
      starttime: time
    }).then(function(result){
      io.sockets.emit('getToken', result.rand);
    });

  });

  socket.on('peerConnections', function(data){
    var peer1 = data.peer1;
    var peer2 = data.peer2;
    var status = data.status;

    if (peer1 != '...' && peer2 != '...') {

      chat.connections.findOne({
          where: {
            peer1:peer1, 
            peer2:peer2
          }
      }).then(function(output){
        if (output) {
          output.updateAttributes({
            status: status,
            updatedAt: new Date()
          });

        } else {
          chat.connections.create({
            peer1: peer1,
            peer2: peer2,
            status: status,
            createdAt:  new Date(),
            updatedAt: new Date()
          });
        }
        
      });

      chat.connections.findOne({
        where: {
          peer1:peer2,
          peer2:peer1
        }
      }).then(function(output){
        output.updateAttributes({
          status: status,
          updatedAt: new Date()
        });
      });
      
    }
  });

  socket.on('peerDisconnected', function(data){
    var peer = data.peer;
    var status = data.status;
  })

});

function getCurrentTime(){
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var time = h+':'+m+':'+s;

  return time;
}

function calcTime(offset) {

  d = new Date();
  
  utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  
  nd = new Date(utc + (3600000*offset));
  
  nd = nd.getFullYear() + '-' + nd.getMonth() + '-' + nd.getDate() + ' ' + nd.getHours() + ':' + nd.getMinutes() + ':' + nd.getSeconds();
  return nd;
}


