// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    'standard',
    'plugin:vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
      parser: 'typescript-eslint-parser',
  },
  env: {
    browser: true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  'rules': {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'ts': 'never',
    }],
    'object-shorthand': ['off', 'properties'],
    'func-names': ['error', 'as-needed'],
    'max-len': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
  }
}
