module.exports = {
  extends: '@deseteral/eslint-config/typescript',
  settings: {
    'import/core-modules': [
      'electron',
    ],
  },
  rules: {
    'max-len': [
      'error',
      140,
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/__tests__/**',
          './config/**',
        ],
        optionalDependencies: false,
      },
    ],
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
      },
    },
  ],
};
