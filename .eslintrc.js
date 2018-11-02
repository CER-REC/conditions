module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: { browser: true },
  rules: {
    'no-console': ['error', { allow: ['error'] }]
  },
}
