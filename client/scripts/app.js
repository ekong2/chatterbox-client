// YOUR CODE HERE:

var app = {};

app.server =  'https://api.parse.com/1/classes/chatterbox';

app.init = function(){
  $( document ).ready(function(){
    $('#send .submit').click(function(){
      var message = $('#message').val();
      app.handleSubmit(message);
      $('#message').val('');
    });
    $('.fetchButton').click(app.fetch);
    $('.newUserSubmit').click(app.newUser);
    window.username = 'anonymous';
    window.friends = [];
  });
};

app.send = function(message){
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data){
      console.log('Successfully sent message.');
    },
    error: function(data){
      console.log('Error— message not sent.');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {order: "-updatedAt", limit: 100},
    contentType: 'application/json',
    success: function(data){
      app.clearMessages();
      data.results.forEach(app.addMessage);
    },
    error: function(data){
      console.log('Error— fetch failed.');
    }
  });
};

app.init();
app.clearMessages = function(){
  $('#chats').empty();
};
app.addMessage = function(message, i, arr){
  var insertion = '<div><span class="username">' + app.escape(message.username) + '</span>: ' + app.escape(message.text) + '</div>';
  $('#chats').prepend(insertion);
  $('.username').click(function(){
    app.addFriend($(this).text());
  });
};
app.addRoom = function(room){
  var insertion = '<div id="' + room + '"></div>';
  $('#roomSelect').append(insertion);
};

app.addFriend = function(name){
 if (window.friends.indexOf(name) > 0){
  window.friends.splice(window.friends.indexOf(name), 1);
 } else {
   window.friends.push(name);
 }
};

app.escape = function(passedIn){
  if(passedIn===undefined || passedIn===null){
    return 'undefined';
  }
  var arrFromString = passedIn.split('');
  var whiteListString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -.,!?;:";
  return arrFromString.map(function(elem, i, arr){
    if(whiteListString.indexOf(elem)===-1){
      return '';
    }
    else {
      return elem;
    }
  }).join('');
}

app.handleSubmit = function(message){
  var paddedMessage = {
    username: window.username,
    text: message
  }
  app.send(paddedMessage);
}

app.newUser = function(){
  window.username = $('#userBox').val();
  $('#userBox').val('');
}

/* Note to self:

data is an object with one array at the key 'results';
the array has other objects in it.
The objects in the array have the following properties:
Example:

  createdAt: "2013-10-07T17:24:40.668Z"
  objectId: "8noEr4Pu8J"
  roomname: "lobby"
  text: "hello"
  updatedAt: "2013-10-07T17:24:40.668Z"
  username: "jillian"

*/
