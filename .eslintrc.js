module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: { browser: true },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
  },
  overrides: [
    {
      files: [
        '.storybook/**',
        'stories/**',
        '**/*.stories.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        'app/tests/**',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
    {
      files: ['**/*.spec.js', '**/*.spec.jsx', 'app/tests/**'],
      env: {
        mocha: true,
      },
    },
    {
      files: ['**/*.stories.jsx'],
      rules: {
        'no-alert': 0,
      },
    },
  ],
}
