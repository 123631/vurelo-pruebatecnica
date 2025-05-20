// ws-client.js
const { io } = require('socket.io-client');

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('🟢 Conectado al servidor WebSocket');
});


socket.on('disconnect', () => {
  console.log('🔴 Desconectado del servidor WebSocket');
});

socket.on('transaction_created', (data) => {
  console.log('📩 Nueva transacción recibida por WebSocket:');
  console.log(JSON.stringify(data, null, 2));
});

