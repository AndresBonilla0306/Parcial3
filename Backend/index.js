const http = require('http');
const express = require('express');

const server = http.createServer();
const app = express();

const io = require('socket.io')(server, 
    {cors: {origin: '*' }
});

app.get('/api/data', (req, res) => {
    const data = { message: 'Heeeeeeeey heyyyyy aquí elRichmc' };

    res.json(data);
});

io.on('connection', (socket) => {
    console.log('Conectadito')

    // socket.broadcast.emit('mensajito', {
    //     usuario: 'Aviso',
    //     mensaje: 'Se conecto un chichon'
    //   });

    socket.on('mensajito', (data) => {
        fetch('http://localhost:4000/api/data')
      .then((response) => response.json())
      .then((data) => {
        socket.emit('datos_obtenidos', data);
      })
      .catch((error) => {
        console.error('Chale XD', error);
      });
    });
    socket.on('custom_event', (data) => {
        console.log('Evento recibido', data);
      });
});

server.listen(4000);