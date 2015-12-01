window.onload = function() {
  
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
 
    $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);

    $("#users li").on('click',function(){
        var uid = $('#cuid').text();
        var id = $(this).attr('id');
        var userName = $(this).find('.nameto').text();
        socket.emit('pm', { userid : id, userTo: userName, cuid: uid});
    });

    socket.on('message', function (data) {

        if(data.message) {
            messages.push(data);console.log(messages);
            var html = '';
            var len = messages.length - 1;
            html += '<b style="color:#ff9933;">' + (messages[len].username ? messages[len].username : messages[len].fromname) + ': </b>';
            html += messages[len].message + '<br />';
            if (html) {
                $( "#content" ).append( html );
            }
            $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);
 
        } else {
            console.log("There is a problem:", data);
        }
    });

    socket.on('getchat', function(data){
        var uid = $('#cuid').text();
        var id = data.result[0].id;
        var user = data.result[0].username;
        var from = data.userFrom;

        socket.emit('pm', {uid: id,username: user, userFrom:from, cuid: uid});
    });

    socket.on('dispConvo', function(data){
        var convo = '<div class="container"><div class="row"><div class="col-md-5"><div class="panel panel-primary"><div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>';
            convo += data.userTo;
            convo += '</div><div id="content" class="panel-body" style="overflow-y: scroll; height: 300px;"><ul class="chat" style="list-style:none;">';
            for(var i=0; i < data.result.length; i++){
                convo += '<li class="left clearfix"><span class="chat-img pull-left"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">';
                if (data.result[i].uid == data.fromID) {
                    convo += data.userFrom;
                } else {
                    convo += data.userTo;
                }
                convo += '</strong> </div><p>';
                convo += data.result[i].message;
                convo += '</p></div></li>';
            };
            convo += '</ul></div><div class="panel-footer"><div class="input-group">';
            convo += '<input id="privatemsg" type="text" class="form-control input-sm" placeholder="Type your message here..." /><span class="input-group-btn"></span></div></div></div></div></div></div>';
        $( ".msg" ).html( convo );
        $("#content").animate({ scrollTop: $('#content').prop("scrollHeight")}, 0);
//console.log(data.fromID);
        $('#privatemsg').on('keyup', function() {
            var cuid = $('#cuid').text();
            var message = $(this).val();
            if (event.which == 13) {
                socket.emit('addConvo',{fromUser: cuid, toUser:data.toID, message: message, toname: data.userTo, fromname: data.userFrom});

            }
        });
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