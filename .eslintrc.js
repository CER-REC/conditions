module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: { browser: true },
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0 }],
    'react/destructuring-assignment': false,
    'react/jsx-one-expression-per-line': false,
  },
  overrides: [
    {
      files: [
        '.storybook/**',
        'stories/**',
        '**/stories.jsx',
        '**/spec.js',
        '**/spec.jsx',
        'src/tests/**',
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
}
