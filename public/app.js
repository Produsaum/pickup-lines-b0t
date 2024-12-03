const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const socket = io();

  React.useEffect(() => {
    socket.on('newMessage', (line) => {
      setMessages(prev => [...prev, { ...line, sender: 'bot' }]);
    });
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const message = input.trim() || 'create the BEST pickup lines ever';
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    socket.emit('getMessage');
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
            {msg.effect && <p className="effect">{msg.effect}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message or click send..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
