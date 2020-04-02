module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // <script type="module" src="..." /> で読み込めるブラウザ向けにtranspileする
        targets: {
          esmodules: true,
        },
        // コードを見て必要なpolyfillを判定し，勝手にimportされるようにする
        useBuiltIns: 'usage',
        // corejs v3のpolyfillを読み込む
        corejs: 3,
        // コード生成に使用されたプラグインのバージョンをログに出力する
        debug: process.env.NODE_ENV === 'development',
        // ES5にダウンパイルする際に，厳密にES6+に準拠しない代わりにシンプルなコードが生成されるようにする
        // ref: https://2ality.com/2015/12/babel6-loose-mode.html
        loose: true,
        // 最新の構文のdownpileで出力されるコードを可能な限り小さくする
        // ref: https://babeljs.io/blog/2020/03/16/7.9.0#babel-preset-envs-bugfixes-option-11083
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ],
};
