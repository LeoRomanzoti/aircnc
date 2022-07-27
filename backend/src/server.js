const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

mongoose.connect('mongodb://omnistack:omnistack@cluster0-shard-00-00.c0zvz.mongodb.net:27017,cluster0-shard-00-01.c0zvz.mongodb.net:27017,cluster0-shard-00-02.c0zvz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cxc1jw-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectUsers = connectedUsers;

    return next();
})


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use (routes);

server.listen(3333);
