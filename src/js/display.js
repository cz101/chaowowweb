$(document).ready(function() {
var i = 0;

function nextMsg() {
data = i % messages.length;
 $('#message').html(messages[data]).fadeIn(2000).delay(1000).fadeOut(2000,nextMsg);
i++;
};

var messages = [
"Official: Coppa Italia dates revealed as Milan will face Juventus next Friday",
"We want you to succeed, that's why we're here.",
"Beer beer beer",
"soccer soccer soccer ",
"We are here to change the game."
];

$('#message').hide();
nextMsg();
});
