
'use strict';
const express = require('express');
const WebSocket = require('ws');

const { Server } = require('ws');
const path = require('path');
const PORT = (process.env.PORT, process.env.IP);
console.log("Port Number: " + PORT)
const INDEX = path.join('./src/App.js');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(process.env.PORT, process.env.IP)
  // .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const wss = new Server({ server });


//   wss.on('connection', (ws) => {
//     console.log('Client connected');
//     ws.on('close', () => console.log('Client disconnected'));
//   });

// const wss = new WebSocket.Server({ port: 3030 }); 

wss.on('connection', function connection(ws) {
    // console.log("Client Connected");
    // ws.on('close', () => console.log('Client disconnected'));
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });

//   setInterval(() => {
//     wss.clients.forEach((client) => {
//       client.send(data);
//     });
//   }, 1000);

//   

