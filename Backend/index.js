const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { logger } = require('./logger/logger');
const connectToDB = require('./boot/00-db');
const seedTeams = require('./boot/01-seedTeams');
const seedUsers = require('./boot/02-seedUsers');
const Team = require('./models/Team');
const Board = require('./models/Board');
const boardRouter = require('./routes/board.routes');
const { port, REACT_APP_URL } = require('./config');

// Connect to database
connectToDB();

// Seeding teams and players
seedTeams();
seedUsers();


const app = express();
app.use(
  cors({
    origin: REACT_APP_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use('/board', boardRouter);


const server = require('http').Server(app);
const io = socketio(server, {
  cors: {
    origin: REACT_APP_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['board-game'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('change-board', async ({ c1, c2, c3, c4, c_sold, team }) => {
    const team_x = await Team.findOne({ name: team });
    await Board.updateMany({}, { $set: { latest: false } });
    const newBoard = await Board.create({
      c1,
      c2,
      c3,
      c4,
      c_sold,
      teamId: team_x._id
    });
    console.log({ newBoard });
    if (team === 'team1') {
      io.emit('new-board-1', { c1, c2, c3, c4, c_sold, teamId: team_x._id });
    } else {

      io.emit('new-board-2', { c1, c2, c3, c4, c_sold, teamId: team_x._id });
    }
  });
});

server.listen(port, () => {
  logger.info(`Server is listening on Port ${port}`);
});