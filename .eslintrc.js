module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    es6: true,
    browser: true,
    node: true, // for jest
    jest: true, // for jest
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    // basic
    'eslint:recommended',

    // import
    'plugin:import/recommended',
    'plugin:import/typescript',

    // react
    'plugin:react/recommended',

    // prettier
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    // basic
    'no-console': 0,
    'func-style': [2, 'declaration', { allowArrowFunctions: true }],
    'no-var': 2,
    'prefer-const': 2,

    // typescript
    '@typescript-eslint/adjacent-overload-signatures': 2,
    // opinionated
    '@typescript-eslint/no-inferrable-types': 2,
    '@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
    '@typescript-eslint/triple-slash-reference': 2,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/type-annotation-spacing': 2,
    '@typescript-eslint/no-for-in-array': 2,
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 0,
    // ESLintの no-unused-vars は正確ではないので, tsc の noUnused* オプションで代用する
    // ref: https://github.com/typescript-eslint/typescript-eslint/pull/688
    // '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-require-imports': 2,
    '@typescript-eslint/array-type': 2,
    // opinionated
    '@typescript-eslint/consistent-type-assertions': 2,
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': 0,
    '@typescript-eslint/no-array-constructor': 2,

    // import
    // eslint ではモジュールの解決に失敗することがあるので, TypeScriptに任せる
    // ref: https://github.com/benmosher/eslint-plugin-import/issues/1341
    'import/named': 0,
    // default export は tsserver と相性が悪いので禁止する
    // ref: https://typescript-jp.gitbook.io/deep-dive/main-1/defaultisbad
    'import/no-default-export': 2,
    // `@material-ui/{core,icons}` を直接 import するとビルドや tsserver の応答が遅くなるので,
    // `@material-ui/{core,icons}` の import を禁止する
    // ref: https://material-ui.com/guides/minimizing-bundle-size/#how-to-reduce-the-bundle-size
    'no-restricted-imports': ['error', { paths: ['@material-ui/core', '@material-ui/icons'] }],

    // react
    'react/self-closing-comp': 2,
    // propTypes は使わないので off にする
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
  },
};
