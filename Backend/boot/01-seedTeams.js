const Team = require('../models/Team');

const { logger } = require('../logger/logger');

module.exports = async function seedTeams() {
  const team1 = await Team.findOne({ name: 'team1' });
  logger.info(`Team ${team1.name} already exists `);
  if (!team1) {
    await Team.create({
      name: 'team1',
    });
  }

  const team2 = await Team.findOne({ name: 'team2' });
  logger.info(`Team ${team2.name} already exists `);
  if (!team2) {
    await Team.create({
      name: 'team2',
    });
  }
};
