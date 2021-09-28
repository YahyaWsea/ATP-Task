const express = require('express');
const boardRouter = express.Router();

const { asyncTryCatch } = require('../middleware/asyncTryCatch');
const User = require('../models/User');
const Team = require('../models/Team');
const Board = require('../models/Board');

const { NOT_FOUND_ERR } = require('../error/errors')

defaultBoard = {
  c1: 8,
  c2: 6,
  c3: 8,
  c4: 20,
  c_sold: 24,
};

boardRouter.post('/', (req, res) => {
  console.log({ req });
  res.json('POST');
});
boardRouter.get(
  '/',
  asyncTryCatch(async (req, res) => {
    const { userName, teamName } = req.query;
    console.log({ userName, teamName });
    const team = await Team.findOne({ name: teamName }).lean();
    const user = await User.findOne({ name: userName }).lean();
    if (user && team) {
      if (user.teamId.toString() === team._id.toString()) {
        const allBoards = await Board.find();
        console.log({ allBoards });
        const board = await Board.findOne({
          teamId: team._id.toString(),
          latest: true,
        });
        console.log({ board });
        if (board) {
          res.send(board);
        } else {
          console.log({ defaultBoard });
          res.send({ ...defaultBoard, teamId: team._id });
        }
      }
    } else {
      throw NOT_FOUND_ERR;
    }
  })
);

module.exports = boardRouter;
