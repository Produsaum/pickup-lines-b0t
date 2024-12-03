const App = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const socket = io();
    
    socket.on('newMessage', (line) => {
      setIsTyping(false);
      setMessages(prev => [...prev, { ...line, sender: 'bot' }]);
    });

    return () => socket.disconnect();
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const message = input.trim() || 'create the BEST pickup lines ever';
    
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    // Emite evento para o servidor
    const socket = io();
    socket.emit('getMessage');
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
        {isTyping && (
          <div className="message bot">
            <p>Thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <form onSubmit={handleSend}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or click send..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
