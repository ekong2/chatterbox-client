// YOUR CODE HERE:
//

var message = $('.chatInput').val();

// $.ajax({
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'GET',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function(data){

//   },
//   error: function(data){}
// });

var app = {};

app.init = function(){
  $( document ).ready(function(){
    $('.submitButton').click(function(){
      var message = $('.chatInput').val();
      app.send(message);
    });
    $('.fetchButton').click(app.fetch);
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
    contentType: 'application/json',
    success: function(data){
      console.log(data);
      // return data.results;
      data.results.forEach(app.addMessage);
    },
    error: function(data){
      console.log('Error— fetch failed.');
    }
  });
};

app.server =  'https://api.parse.com/1/classes/chatterbox';

app.init();
app.clearMessages = function(){
  $('#chats').empty();
};
app.addMessage = function(message, i, arr){
  var insertion = '<div>' + message.username + ': ' + message.text + '</div>';
  $('#chats').append(insertion);
};
app.addRoom = function(room){
  var insertion = '<div id="' + room + '"></div>';
  $('#roomSelect').append(insertion);
};

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
