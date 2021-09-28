const User = require('../models/User');
const Team = require('../models/Team');

const { logger } = require('../logger/logger');

module.exports = async function seedUsers() {
  const team1 = await Team.findOne({ name: 'team1' });
  const user1 = await User.findOne({ name: 'player1' });

  // logger.info(`User ${user1.name} already exists in team: ${team1.name} `);
  if (!user1) {
    await User.create({
      name: 'player1',
      teamId: team1._id
    });
  }
  const user2 = await User.findOne({ name: 'player2' });
  // logger.info(`User ${user2.name} already exists in team: ${team1.name} `);
  if (!user2) {
    await User.create({
      name: 'player2',
      teamId: team1._id
    });
  }

  const team2 = await Team.findOne({ name: 'team2' });
  const user3 = await User.findOne({ name: 'player3' });
  // logger.info(`User ${user3.name} already exists in team: ${team2.name} `);
  if (!user3) {
    await User.create({
      name: 'player3',
      teamId: team2._id
    });
  }


  const user4 = await User.findOne({ name: 'player4' });
  // logger.info(`User ${user4.name} already exists in team: ${team2.name} `);
  if (!user4) {
    await User.create({
      name: 'player4',
      teamId: team2._id
    });
  }


};
