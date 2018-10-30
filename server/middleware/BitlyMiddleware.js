import express from 'express';

// mock endpoint - designed to resemble a bitly request but doesn't actually do so
function handler(request, res) {
  res.setHeader('content-type', 'application/json');
  res.write(JSON.stringify({
    status_code: 200,
    status_txt: 'OK',
    data: {
      url: 'https://bit.ly/2E2w5zr',
      hash: 'asdfdsfkl',
      global_hash: 'asdcxb',
      long_url: 'https://apps2.neb-one.gc.ca/imports-exports',
      new_hash: 0,
    },
  }));
  res.end();
}

export default () => {
  const app = express();
  app.get('/bitly_url', handler);
  return app;
};
