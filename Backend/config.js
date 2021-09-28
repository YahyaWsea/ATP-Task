const config = {
  port: process.env.PORT || 3333,
  DBUrl: process.env.MONGO_URL || 'mongodb://localhost:27018/atp',
  REACT_APP_URL: process.env.REACT_APP_URL || 'http://localhost:3001',
};

module.exports = config;
