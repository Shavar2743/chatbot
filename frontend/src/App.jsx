import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaRegCopy, FaMoon, FaSun, FaPaperPlane } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Howl } from 'howler';
import './App.css'; // Stelle sicher, dass deine CSS-Datei importiert wird

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sound = new Howl({
    src: ['/sounds/beep-07.wav']
  });

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'User', text: input, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      setIsTyping(true);
      scrollToBottom();

      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const botMessage = { sender: 'Kaity', text: data.reply, timestamp: new Date() };
          setMessages(prevMessages => [...prevMessages, botMessage]);
          setIsTyping(false);
          sound.play();
          scrollToBottom();
        } catch (error) {
          console.error('Error:', error);
          setIsTyping(false);
          toast.error('Error sending message. Please try again.');
        }
      }, 2000); // Kaity sendet die Nachricht nach 2 Sekunden
    }, 1000); // Kaity beginnt nach 1 Sekunde zu tippen
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Text copied to clipboard!');
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-tr ${darkMode ? 'from-gray-500 via-gray-700 to-gray-900' : 'from-pink-200 via-white to-white'} transition-colors duration-300`}>
      <ToastContainer />
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 flex items-center border border-gray-300 dark:border-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>
      <div className={`chat-window bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transition-colors duration-300 ${darkMode ? 'shadow-white' : 'shadow-lg'} border border-gray-300 dark:border-gray-600 ${isTyping ? 'typing' : ''}`}>
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-center mb-4">Chat with Us</h1>
          <div id="messages" className="flex flex-col space-y-4 overflow-y-auto h-80 sm:h-96 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-end space-x-2 ${msg.sender === 'Kaity' ? 'self-start' : 'self-end'}`}
                aria-live="polite"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${msg.sender === 'Kaity' ? 'bg-blue-500' : 'bg-green-500'} overflow-hidden border-2 ${msg.sender === 'Kaity' ? 'border-blue-300' : 'border-green-300'} shadow-lg`}>
                  <img src={msg.sender === 'Kaity' ? '/images/kaity-avatar.jpg' : '/images/user-avatar.jpg'} alt={`${msg.sender} avatar`} className="w-full h-full object-cover" />
                </div>
                <div className={`relative p-3 rounded-lg ${msg.sender === 'Kaity' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'} border border-gray-300 dark:border-gray-600 hover:shadow-lg transition-shadow duration-300`}>
                  <div className={`font-semibold ${msg.sender === 'Kaity' ? 'text-blue-500 dark:text-blue-300' : 'text-green-500 dark:text-green-300'}`}>
                    {msg.sender}
                  </div>
                  <div>{msg.text}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                  {msg.sender === 'Kaity' && (
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="absolute top-1 right-1 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full focus:outline-none"
                      aria-label="Copy message"
                    >
                      <FaRegCopy className="text-gray-500 dark:text-gray-300" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-end space-x-2 self-start"
                aria-live="polite"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 overflow-hidden border-2 border-blue-300 shadow-lg">
                  <img src="/images/kaity-avatar.jpg" alt="Kaity avatar" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 border border-gray-300 dark:border-gray-600 hover:shadow-lg transition-shadow duration-300">
                  <div className="font-semibold text-blue-500 dark:text-blue-300">
                    Kaity
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="dot-flashing"></span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 transition-colors duration-300 border border-gray-300 dark:border-gray-600"
              placeholder="Type a message"
              aria-label="Type a message"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 flex items-center"
              aria-label="Send message"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
