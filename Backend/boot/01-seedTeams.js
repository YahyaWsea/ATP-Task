const Team = require('../models/Team');
const User = require('../models/User');

const { logger } = require('../logger/logger');

module.exports = async function seedTeams() {
  const team1 = await Team.findOne({ name: 'team1' });
  if (!team1) {
    const createdTeam1 = await Team.create({
      name: 'team1',
    });
    logger.info(`Team1 ctreated with id: ${createdTeam1._id}`);
    await User.create({
      name: 'player1',
      teamId: createdTeam1._id
    });
    await User.create({
      name: 'player2',
      teamId: createdTeam1._id
    });
  }

  const team2 = await Team.findOne({ name: 'team2' });
  if (!team2) {
    const createdTeam2 = await Team.create({
      name: 'team2',
    });
    logger.info(`Team2 ctreated with id: ${createdTeam2._id}`);
    await User.create({
      name: 'player3',
      teamId: createdTeam2._id,
    });
    await User.create({
      name: 'player4',
      teamId: createdTeam2._id,
    });
  }
};
