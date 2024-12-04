const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});

const path = require('path');

const pickupLines = [
  {text: "Are you my internet history? Because I want you all to myself and can't delete you from my mind", effect: "💻 Chrome has stopped working"},
  {text: "Are you AI? Because you're artificially perfect but naturally irresistible", effect: "🤖 Task failed successfully"},
  {text: "Are you my code? Because I keep falling into an infinite loop thinking about you", effect: "⚠️ System overload"},
  {text: "Are you a password? Because you're secure, complex, and hard to forget", effect: "🔐 Access definitely denied"},
  {text: "Are you a startup? Because I'd like to be your angel investor and get 100% equity in your heart", effect: "💸 Shark Tank has left the chat"},
  {text: "Are you LinkedIn? Because you're making my network worth connecting to", effect: "👔 Professional boundaries violated"},
  {text: "Are you a crypto? Because my interest in you is going to the moon", effect: "📈 Relationship stonks"},
  {text: "Are you my screen time? Because you're toxic fr fr but I can't stop thinking about you no cap", effect: "📱 Touch grass bestie"},
  {text: "Hey bestie, are you TikTok? Because you've been living rent free in my head 24/7", effect: "🏠 Brain has stopped working"},
  {text: "Are you my Spotify wrapped? Because you're my top pick of the year fr", effect: "🎵 Cringe playlist activated"},
  {text: "Are you Instagram? Because you're filtering all the other people from my mind", effect: "📸 Reality check needed"},
  {text: "Are you Twitter? Because you've got me feeling blue but I still can't quit you", effect: "🐦 Tweet this L"},
  {text: "Are you Netflix? Because I could binge you all day and still want more", effect: "🎬 Are you still watching?"},
  {text: "Are you Spotify premium? Because you're worth paying for and I never want to skip", effect: "💚 Subscription cancelled"},
  {text: "Are you my dating app? Because you're making me swipe right on life", effect: "📱 Account suspended"},
  {text: "Are you my Uber rating? Because you're a solid 5 stars", effect: "⭐️ Driver has left the chat"},
  {text: "Are you my salary? Because you're way above my expectations", effect: "💼 HR wants to know your location"},
  {text: "Are you a meeting? Because I want to spend unnecessary time with you", effect: "📅 Calendar blocked forever"},
  {text: "Are you a gaming PC? Because you're hot, expensive, and way out of my league", effect: "🎮 Game Over"},
  {text: "Are you my K/D ratio? Because you're making me look bad but I still care about you", effect: "🎯 Headshot to the heart"}
];

// Mantém registro das linhas já usadas
let usedLines = new Set();

io.on('connection', socket => {
  console.log('User connected');
  
  socket.on('getMessage', () => {
    // Reseta as linhas usadas se todas já foram usadas
    if (usedLines.size >= pickupLines.length) {
      usedLines.clear();
    }
    
    // Filtra linhas não usadas e escolhe uma aleatória
    const availableLines = pickupLines.filter(line => !usedLines.has(line.text));
    const line = availableLines[Math.floor(Math.random() * availableLines.length)];
    
    // Marca a linha como usada
    usedLines.add(line.text);
    
    // Simula delay para efeito de digitação
    setTimeout(() => {
      socket.emit('newMessage', line);
    }, 1000);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
