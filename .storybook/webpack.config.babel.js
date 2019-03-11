const webpackConfig = require('../webpack.config.babel.js');

module.exports = (baseConfig, env, defaultConfig) => {
  Object.assign(defaultConfig.module, { rules: webpackConfig.module.rules });
  Object.assign(defaultConfig.resolve.alias, webpackConfig.resolve.alias);
  return defaultConfig;
};
