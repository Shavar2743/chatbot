# My Chatbot

Ein moderner Sprach-Chatbot, erstellt mit Node.js, React, Vite und Tailwind CSS. Das Projekt ist auf einem Ubuntu-Server gehostet und nutzt Mozilla DeepSpeech und TTS für Sprachschnittstellen.

## Inhaltsverzeichnis

- [Installation](#installation)
  - [Voraussetzungen](#voraussetzungen)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Nginx Konfiguration](#nginx-konfiguration)
- [Nutzung](#nutzung)
- [Entwicklung](#entwicklung)
- [Lizenz](#lizenz)

## Installation

### Voraussetzungen

- Node.js (v14 oder höher)
- Nginx
- Git

### Frontend

1. Projekt initialisieren: Erstelle ein neues Vite-Projekt mit React und installiere die Abhängigkeiten.
    ```bash
    npm create vite@latest my-chatbot-frontend --template react
    cd my-chatbot-frontend
    npm install
    ```

2. Tailwind CSS installieren und konfigurieren.
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

3. Passe die `App`-Komponente und andere relevante Dateien an.
4. Starte den Entwicklungsserver und baue das Projekt für die Produktion.
    ```bash
    npm run dev
    npm run build
    ```

### Backend

1. Projekt initialisieren: Erstelle ein neues Node.js-Projekt und installiere die benötigten Pakete (Express, Body-Parser, Axios).
    ```bash
    mkdir my-chatbot-backend
    cd my-chatbot-backend
    npm init -y
    npm install express body-parser axios
    ```

2. Erstelle den Server und definiere die Routen für die Kommunikation mit Rasa.
3. Starte den Backend-Server.
    ```bash
    node index.js
    ```


## Nginx Konfiguration

1. Bearbeite die Nginx-Konfigurationsdatei (`/etc/nginx/sites-available/default`).
    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```

2. Füge die Konfiguration für das Routing des Frontends und Backends hinzu.
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

3. Starte Nginx neu, um die Änderungen zu übernehmen.
    ```bash
    sudo systemctl restart nginx
    ```

## Nutzung

1. Starte das Backend.
    ```bash
    cd my-chatbot/my-chatbot-backend
    node index.js
    ```

2. Starte das Frontend.
    ```bash
    cd my-chatbot/my-chatbot-frontend
    npm run dev
    ```

3. Öffne deinen Browser und gehe zu der konfigurierten Domain.

## Entwicklung

- **Frontend Entwicklung:** Starte den Entwicklungsserver für das Frontend.
    ```bash
    cd my-chatbot/my-chatbot-frontend
    npm run dev
    ```

- **Backend Entwicklung:** Starte den Backend-Server und entwickle die Logik weiter.
    ```bash
    cd my-chatbot/my-chatbot-backend
    node index.js
    ```

- **Rasa Integration:** Stelle sicher, dass Rasa korrekt läuft und die Konversationen verarbeitet.

# Einrichten der EC2-Instanz 

### Update und Installation der notwendigen Pakete
```bash
sudo apt update
sudo apt upgrade -y
```
### Node.js und npm installieren
Installieren Sie Node.js aus den offiziellen NodeSource-Repositorys:
```bash
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```
### Überprüfen Sie die Installation von Node.js und npm
```bash
node -v
npm -v
```
### MySQL installieren
```bash
sudo apt install -y mysql-server
```
### xdg-utils installieren
```bash
sudo apt install -y xdg-utils
```

## Lizenz

Dieses Projekt ist durch eine proprietäre Lizenz geschützt. Alle Rechte vorbehalten. Die Nutzung, Vervielfältigung, Modifikation, Zusammenführung, Veröffentlichung, Verbreitung, Unterlizenzierung und/oder der Verkauf von Kopien der Software sind ohne ausdrückliche Genehmigung des Autors/der Autoren nicht gestattet.

Für Genehmigungsanfragen kontaktiere bitte Christopher Breunig, Johannes Scholl und Markus Heindle.
