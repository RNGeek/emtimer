// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: 'standard',
  parser: 'vue-eslint-parser',
  parserOptions: {
      parser: 'typescript-eslint-parser'
  },
  env: {
    browser: true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'ts': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-shorthand': ['off', 'properties'],
    'func-names': ['error', 'as-needed'],
    'max-len': ['off'],
    'comma-dangle': ['error', 'always-multiline']
  }
}
