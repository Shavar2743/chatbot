# My Chatbot

## Planung zur Erstellung eines Sprach-Chatbots

Einen Sprach-Chatbot zu bauen ist ein mehrstufiger Prozess, der verschiedene Technologien und Entwicklungsphasen umfasst. Hier sind die wesentlichen Schritte, die du befolgen kannst:

### Ziel und Anwendungsfall definieren

- Bestimme den Zweck des Chatbots (z.B. Kundenservice, Informationsbereitstellung, Unterhaltung).
- Identifiziere die Zielgruppe und ihre Anforderungen.

### Technologiestapel auswählen

- NLP-Frameworks und -Bibliotheken: Rasa
- Programmiersprache: JavaScript (Node.js)
- Sprachschnittstellen: Mozilla DeepSpeech (Speech-to-Text), Mozilla TTS (Text-to-Speech)

### Grundgerüst erstellen

1. **Entwicklungsumgebung einrichten:**

    ```bash
    sudo apt update
    sudo apt upgrade -y
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
    sudo apt install -y mysql-server
    sudo apt install -y xdg-utils
    ```

2. **Basis-Chatbot erstellen:**
    Implementiere die grundlegende Logik für das Empfangen und Senden von Nachrichten mit Node.js und Express.

### Natürliche Sprachverarbeitung (NLP) integrieren

- **Spracherkennung:** Nutze Mozilla DeepSpeech, um gesprochene Eingaben in Text umzuwandeln.
- **Intent-Erkennung und Entitätsextraktion:** Verwende Rasa, um die Absicht hinter den Benutzeranfragen zu erkennen und relevante Informationen zu extrahieren.
- **Antwortgenerierung:** Implementiere Logik oder nutze Rasa, um passende Antworten zu generieren.

### Dialogfluss gestalten

- **Dialogzustände und -übergänge definieren:** Erstelle eine Struktur, die die möglichen Zustände und Übergänge im Dialog definiert.
- **Kontextmanagement:** Halte den Kontext des Gesprächs aufrecht, um zusammenhängende und relevante Antworten zu geben.

### Sprachsynthese integrieren

- **Antworten in Sprache umwandeln:** Nutze Mozilla TTS, um Textantworten in gesprochene Sprache umzuwandeln.

### Benutzeroberfläche entwickeln

- **Web- oder Mobilanwendung:** Erstelle eine Schnittstelle mit React, Vite und Tailwind CSS, über die Benutzer mit dem Chatbot interagieren können.
- **Sprachschnittstelle:** Implementiere ein Mikrofon für die Eingabe und Lautsprecher oder Kopfhörer für die Ausgabe.

### Training und Optimierung

- **Daten sammeln und annotieren:** Sammle Dialogdaten, um den Chatbot zu trainieren und zu verbessern.
- **Feedback einholen:** Nutze Benutzerfeedback, um Schwächen zu identifizieren und den Chatbot kontinuierlich zu optimieren.

### Sicherheit und Datenschutz gewährleisten

- **Datenverschlüsselung:** Stelle sicher, dass alle Daten während der Übertragung und Speicherung verschlüsselt sind.
- **Datenschutzrichtlinien:** Implementiere Maßnahmen, um die Privatsphäre der Benutzer zu schützen und die Einhaltung von Datenschutzbestimmungen sicherzustellen.

### Testen und Bereitstellen

- **Umfangreiches Testen:** Teste den Chatbot unter verschiedenen Bedingungen und Szenarien, um sicherzustellen, dass er robust und zuverlässig ist.
- **Bereitstellung:** Veröffentliche den Chatbot auf der gewünschten Plattform und mache ihn für die Benutzer verfügbar.

---

## Inhaltsverzeichnis

- Installation
- Voraussetzungen
- Frontend
- Backend
- Nginx Konfiguration
- Nutzung
- Entwicklung
- Einrichten der EC2-Instanz
- Lizenz

---

## Installation

### Voraussetzungen

- Node.js (v14 oder höher)
- Nginx
- Git

### Frontend

1. **Projekt initialisieren:**

    ```bash
    npm create vite@latest my-chatbot-frontend --template react
    cd my-chatbot-frontend
    npm install
    ```

2. **Tailwind CSS installieren und konfigurieren:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. **Passe die App-Komponente und andere relevante Dateien an.**
4. **Starte den Entwicklungsserver und baue das Projekt für die Produktion:**

    ```bash
    npm run dev
    npm run build
    ```

### Backend

1. **Projekt initialisieren:**

    ```bash
    mkdir my-chatbot-backend
    cd my-chatbot-backend
    npm init -y
    npm install express body-parser axios
    ```

2. **Erstelle den Server und definiere die Routen für die Kommunikation mit Rasa.**
3. **Starte den Backend-Server:**

    ```bash
    node index.js
    ```

### Nginx Konfiguration

1. **Bearbeite die Nginx-Konfigurationsdatei (/etc/nginx/sites-available/default):**

    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```

2. **Füge die Konfiguration für das Routing des Frontends und Backends hinzu:**

    ```nginx
    server {
        listen 80;

        server_name your_domain.com;

        location / {
            root /var/www/my-chatbot/my-chatbot-frontend/dist;
            try_files $uri $uri/ /index.html;
        }

        location /chat {
            proxy_pass http://localhost:3001/chat;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3. **Starte Nginx neu, um die Änderungen zu übernehmen:**

    ```bash
    sudo systemctl restart nginx
    ```

## Nutzung

1. **Starte das Backend:**

    ```bash
    cd my-chatbot/my-chatbot-backend
    node index.js
    ```

2. **Starte das Frontend:**

    ```bash
    cd my-chatbot/my-chatbot-frontend
    npm run dev
    ```

3. **Öffne deinen Browser und gehe zu der konfigurierten Domain.**

## Entwicklung

- **Frontend Entwicklung:** Starte den Entwicklungsserver für das Frontend:

    ```bash
    cd my-chatbot/my-chatbot-frontend
    npm run dev
    ```

- **Backend Entwicklung:** Starte den Backend-Server und entwickle die Logik weiter:

    ```bash
    cd my-chatbot/my-chatbot-backend
    node index.js
    ```

- **Rasa Integration:** Stelle sicher, dass Rasa korrekt läuft und die Konversationen verarbeitet.

## Einrichten der EC2 Instanz

1. **Update und Installation der notwendigen Pakete:**

    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

2. **Node.js und npm installieren:**

    ```bash
    curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt install -y nodejs
    ```

3. **Überprüfen Sie die Installation von Node.js und npm:**

    ```bash
    node -v
    npm -v
    ```

4. **MySQL installieren:**

    ```bash
    sudo apt install -y mysql-server
    ```

5. **xdg-utils installieren:**

    ```bash
    sudo apt install -y xdg-utils
    ```

## Lizenz

Dieses Projekt ist durch eine proprietäre Lizenz geschützt. Alle Rechte vorbehalten. Die Nutzung, Vervielfältigung, Modifikation, Zusammenführung, Veröffentlichung, Verbreitung, Unterlizenzierung und/oder der Verkauf von Kopien der Software sind ohne ausdrückliche Genehmigung des Autors/der Autoren nicht gestattet.

Für Genehmigungsanfragen kontaktiere bitte Christopher Breunig, Johannes Scholl und Markus Heindle.
