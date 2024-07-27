# Einrichtung eines Rasa-Chatbots

## Systemanforderungen
- Python 3.10.x
- Node.js und npm
- Git
- Visual Studio Code

## Installation von Python 3.10.x

1. **Überprüfen der installierten Python-Version:**

    ```powershell
    python --version
    python3 --version
    ```

2. **Falls notwendig, Python 3.10.11 herunterladen und installieren:**
    - Lade den Python 3.10.11 Installer von der offiziellen [Python-Website](https://www.python.org/downloads/release/python-31011/) herunter.
    - Installiere Python 3.10.11 und wähle die Option "Add Python to PATH" während der Installation aus.

3. **Überprüfe die Installation:**

    ```powershell
    python3 --version
    ```

## Einrichtung einer virtuellen Umgebung und Installation von Rasa

1. **Erstelle eine virtuelle Umgebung:**

    ```powershell
    python3 -m venv rasa-env
    ```

2. **Aktiviere die virtuelle Umgebung:**

    - Auf Windows:

        ```powershell
        .\rasa-env\Scripts\activate
        ```

3. **Überprüfe die Python-Version in der virtuellen Umgebung:**

    ```powershell
    python --version
    ```

4. **Aktualisiere pip, setuptools und wheel in der virtuellen Umgebung:**

    ```powershell
    pip install --upgrade pip setuptools wheel
    ```

5. **Installiere Rasa:**

    ```powershell
    pip install rasa
    ```

6. **Initialisiere ein neues Rasa-Projekt:**

    ```powershell
    mkdir my-chatbot-rasa
    cd my-chatbot-rasa
    rasa init
    ```

## Einrichtung des Backend mit Node.js und Express

1. **Erstelle ein neues Verzeichnis für das Backend und initialisiere ein Node.js-Projekt:**

    ```bash
    mkdir my-chatbot-backend
    cd my-chatbot-backend
    npm init -y
    ```

2. **Installiere die notwendigen Pakete:**

    ```bash
    npm install express body-parser axios
    ```

3. **Erstelle eine `index.js`-Datei und füge den folgenden Code hinzu:**

    ```javascript
    const express = require('express');
    const bodyParser = require('body-parser');
    const axios = require('axios');

    const app = express();
    app.use(bodyParser.json());

    const RASA_SERVER = 'http://localhost:5005/webhooks/rest/webhook';

    app.post('/chat', async (req, res) => {
        const message = req.body.message;

        try {
            const response = await axios.post(RASA_SERVER, {
                sender: 'user',
                message: message
            });

            const replies = response.data.map((r) => r.text).join(' ');
            res.json({ reply: replies });
        } catch (error) {
            res.status(500).send('Error communicating with Rasa server');
        }
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    ```

4. **Starte den Backend-Server:**

    ```bash
    node index.js
    ```

## Einrichtung des Frontend mit React, Vite und Tailwind CSS

1. **Erstelle ein neues Vite-Projekt mit React:**

    ```bash
    mkdir my-chatbot-frontend
    cd my-chatbot-frontend
    npm create vite@latest my-chatbot-frontend --template react
    cd my-chatbot-frontend
    npm install
    ```

2. **Installiere Tailwind CSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. **Konfiguriere Tailwind CSS:**

    - Bearbeite die Datei `tailwind.config.js`:

        ```javascript
        module.exports = {
          content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
            extend: {},
          ],
          plugins: [],
        }
        ```

    - Erstelle oder bearbeite die Datei `src/index.css` und füge Folgendes hinzu:

        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

4. **Erstelle eine `App.jsx`-Datei im Verzeichnis `src` und füge den folgenden Code hinzu:**

    ```javascript
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
    ```

5. **Starte den Entwicklungsserver:**

    ```bash
    npm run dev
    ```

## Chatbot testen

1. **Starte den Rasa-Server:**

    ```powershell
    cd my-chatbot-rasa
    rasa run
    ```

2. **Starte das Backend:**

    ```bash
    cd my-chatbot-backend
    node index.js
    ```

3. **Starte das Frontend:**

    ```bash
    cd my-chatbot-frontend
    npm run dev
    ```

4. **Öffne deinen Browser und gehe zu `http://localhost:3000`, um den Chatbot zu testen.**
