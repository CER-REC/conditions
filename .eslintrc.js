module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: { browser: true },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    'react/destructuring-assignment': 0,
    'react/jsx-one-expression-per-line': 0,
    'object-curly-newline': ['error', {
      minProperties: 8,
      multiline: true,
      consistent: true,
    }],
  },
  overrides: [
    {
      files: [
        '.storybook/**',
        'documentation/**',
        '**/stories.jsx',
        '**/spec.js',
        '**/spec.jsx',
        'src/tests/**',
        'serveLazyDevServer.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
    {
      files: [
        '**/spec.js',
        '**/spec.jsx',
        '**/*.spec.js',
        '**/*.spec.jsx',
        'src/tests/**',
        '.storybook/spec.js',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/stories.jsx'],
      rules: {
        'no-alert': 0,
      },
    },
  ],
};
