var express   = require('express');
var session   = require('express-session');
//var cookieParser = require('cookie-parser');
var fs        = require('fs');
var mysql     = require("mysql");
var app       = express();
var bodyParser = require('body-parser');
var http      = require('http').Server(app);
var io        = require("socket.io")(http);
var chat      = require('./app/models/message');
var port      = 3000;
app.set('views', __dirname + '/app/views');
app.set('view engine', "html");
app.engine('html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(cookieParser);
app.use(session({secret: '1234567890QWERTY'}));

var router    = express.Router(); 
var sess;
// middleware to use for all requests
router.use(function(req, res, next) {
  sess=req.session;
  if (sess.loggedin) {
    console.log(sess.loggedin);
  }
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

io.listen(app.listen(port)); //listen to port

/*index get*/
router.get("/", function(req, res){
  if (sess.loggedin) {
    chat.users.findAll({
      where:{  
        id: {ne : sess.loggedin.id}
      }
    }).then(function(result) {
      res.render('index', {data:result});
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
            id: {ne : sess.loggedin.id}
          }
        }).then(function(result) {
          res.render('index', {data:result, user : sess.loggedin.username, uid: sess.loggedin.id});
        });
      } else {
        console.log('invalid user');
      }
  });
});

/*All conversation*/
router.get("/chat", function(req, res){
    console.log(sess);
    if (sess.loggedin) {
      chat.tblchats.findAll().then(function(result) {
        res.render("page", {data:result,user:sess.loggedin.username});
      });
    } else {
      res.redirect('/');
    } 
});

app.use('/', router);

io.sockets.on('connection', function (socket) {

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

    socket.on('pm', function(data) {
      if (data.userid){
        chat.users.findAll({
          where: {
            id: data.userid
          }

        }).then(function(result) {
          socket.emit('getchat', {result: result, userFrom: data.cuid});
        });
      } else if (data.uid) {
        toID = data.uid;
        toUser = data.username;
        curID = data.cuid;
        curName = sess.loggedin.username;
console.log(curID);
        chat.pmessages.findAll({
          where: {
            $or: [{uid:curID,toid: toID}, {toid: curID, uid:toID}]
          }
            
        }).then(function(result) {
          socket.emit('dispConvo', {result:result, fromID: curID, toID: toID, userTo:toUser, userFrom: curName});
        });
      }

    });

    socket.on('addConvo', function(data){
      console.log(data);
        if (data) {
          chat.pmessages.create({
            uid: data.fromUser,
            toid: data.toUser,
            message: data.message
          }).then(function(result) {
            
            chat.pmessages.findAll({
            where: {
                $or: [{uid:data.fromUser,toid: data.toUser}, {toid: data.fromUser, uid:data.toUser}]
              }
                
            }).then(function(result) {
              io.sockets.emit('dispConvo', {result:result, fromID: data.fromUser, toID: data.toUser, userTo:data.toname, userFrom: data.fromname});
            });
          });;
        }
        
    });
});