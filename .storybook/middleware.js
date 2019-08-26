const proxy = require('http-proxy-middleware');

module.exports = (router) => {
  router.use('/conditions/graphql', proxy('http://10.13.80.28'));
};
