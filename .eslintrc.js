module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  env: {
    browser: true,
  },
  plugins: ['prettier', 'jsx-a11y'],
  rules: {
    'react/no-danger': 1,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'react/prefer-stateless-function': 1,
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'react/destructuring-assignment': 1,
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-console': 1,
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    React: true,
  },
  parser: 'babel-eslint',
}
