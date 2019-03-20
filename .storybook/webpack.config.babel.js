const webpackConfig = require('../webpack.config.babel.js');

module.exports = ({ config }) => {
  Object.assign(config.module, { rules: webpackConfig.module.rules });
  Object.assign(config.resolve.alias, webpackConfig.resolve.alias);
  return config;
};
