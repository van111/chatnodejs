window.onload = function() {
 
    var socket = io.connect('http://localhost:3000');
    var username = document.getElementById("username");
    var login = document.getElementById("login");
    var password = document.getElementById("password");
 
    
    $('#login').click(function(){
        socket.emit('login', { username: username.value, password: password.value });
    });
}