const webpackConfig = require('../webpack.config.js');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = webpackConfig.module.rules;
  return defaultConfig;
};
