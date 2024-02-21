const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware для обработки статических файлов с корректным Content-Type
app.use(express.static('public', {
    setHeaders: (res, path, stat) => {
      // Устанавливаем правильный Content-Type для файлов CSS
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

wss.on('connection', (ws) => {
  console.log('Новое соединение');

  ws.on('message', (message) => {
    console.log(`Получено сообщение от клиента: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
