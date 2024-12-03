const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const pickupLines = [
  {text: "Are you my internet history? Because I want you all to myself and can't delete you from my mind", effect: "💻 Chrome has stopped working"},
  {text: "Are you AI? Because you're artificially perfect but naturally irresistible", effect: "🤖 Task failed successfully"},
  {text: "Are you my code? Because I keep falling into an infinite loop thinking about you", effect: "⚠️ System overload"}
];

io.on('connection', socket => {
  console.log('User connected');
  socket.on('getMessage', () => {
    const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    socket.emit('newMessage', line);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(process.env.PORT || 3000);
