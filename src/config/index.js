const development = require('./development.json');

const config = { development };

module.exports = {
  getConfig: (env = 'development') => config[env],
};
