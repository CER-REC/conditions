const webpackConfig = require('../webpack.config.js');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = webpackConfig.module.rules;
  Object.assign(defaultConfig.resolve.alias, webpackConfig.resolve.alias);
  return defaultConfig;
};
