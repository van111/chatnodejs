window.onload = function() {
  
    var messages = [];
    var socket = io.connect('https://fdc-signal.inn-devel.com:4501');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);

    $("#users li").on('click',function(){
        var uid = $('#cuid').text();
        var toid = $(this).attr('id');
        var fromuser = $('#cuser').text();
        var touser = $(this).find('.nameto').text();

        socket.emit('showpm', { toid : toid, touser: touser, cuid: uid});
    });

    $("#postfeed").click(function(){
        var message = $("#statusMsg").val();
        var uid = $('#cuid').text();

        $("#statusMsg").val('');
        socket.emit('saveStat', {message:message, username: uid});
        
    }); 

    socket.on('notify',function(msg){
              console.log(msg);
            notifyMe(msg.username, msg.message);
        });

    function notifyMe(user,message) {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        var options = {
            body: message,
            dir : "ltr"
        };
        var notification = new Notification(user + " Posted a comment",options);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === "granted") {
            var options = {
                    body: message,
                    dir : "ltr"
            };
            var notification = new Notification(user + " Posted ",options);
          }
        });
      }
    }

    socket.on('connect', function(){
        var uid = $('#cuid').text();
        socket.emit('dispNewsFeed', {username: uid});
    });

    socket.on('post', function(data){
        var message = data.message;
        var uid = data.username;

        var feed = '<div class="panel panel-default"><div class="panel-heading"> '+uid+'</div><div class="panel-body">'+message+'</div></div>';
        $("#statFeed").prepend(feed);
        $("#statusMsg").val('');
    });

    socket.on('showNF', function(data){
        var feeds = '';
        for(var i=0; i < data.result.length; i++){
            feeds +='<div class="panel panel-default"><div class="panel-heading">'+data.result[i].username+'</div><div class="panel-body">'+data.result[i].message+'</div></div>';
        }
        $( "#statFeed" ).html( feeds );
    });

    socket.on('dispConvo', function(data){console.log(data);
        var convo = "";
            convo = '<div class="container"><div class="row"><div class="col-md-5"><div class="panel panel-primary"><div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>';
            convo += '<span id="toid">'+data.touser+'</span>';
            convo += '</div><div id="content" class="panel-body" style="overflow-y: scroll; height: 300px;"><ul class="chat" style="list-style:none;">';
            for(var i=0; i < data.result.length; i++){
                convo += '<li class="left clearfix"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">';
                convo += data.result[i].uid;
                convo += '</strong> </div><p>';
                convo += data.result[i].message;
                convo += '</p></div></li>';
            };
            convo += '</ul></div><div class="panel-footer"><div class="input-group">';
            convo += '<input id="privatemsg" type="text" class="form-control input-sm" placeholder="Type your message here..." /><span class="input-group-btn"></span></div></div></div></div></div></div>';
        $( ".msg" ).html( convo );
        $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);

        $('#privatemsg').on('keyup', function() {
            var cuid = $('#cuid').text();
            var toid = data.toid;
            var message = $(this).val();
            if (event.which == 13) {
                socket.emit('addConvo',{cuid:cuid, toid:toid, message:message});
                $(this).val('');
            }
        });
    });

    socket.on('message', function (data) {

        if(data.message) {
            messages.push(data);console.log(messages);
            var html = '';
            var len = messages.length - 1;
            html += '<li class="left clearfix"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">' + (messages[len].username ? messages[len].username : messages[len].cuid) + '</strong> </div><p>';
            html += messages[len].message + '</p></div></li>';
            if (html) {
                $( "#content ul" ).append( html );
            }
            $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);
 
        } else {
            console.log("There is a problem:", data);

        }
    });

    /*sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
        }
    };*/
  
}