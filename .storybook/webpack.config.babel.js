const webpackConfig = require('../webpack.config.babel.js');

module.exports = ({ config }) => {
  config.module.rules = webpackConfig.module.rules;
  Object.assign(config.resolve.alias, webpackConfig.resolve.alias);
  return config;
};
