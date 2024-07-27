import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: data.reply }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <div className="mb-4">
          <div id="messages" className="space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'bot' ? 'text-blue-500' : 'text-green-500'}`}>
                {msg.sender}: {msg.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded w-full py-2 px-3"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
