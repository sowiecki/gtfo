'use strict';

module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          environment: './environment',
          client: './client',
          config: './client/config',
          components: './client/components',
          utils: './client/utils',
          constants: './client/constants'
        }
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types', 'transform-react-constant-elements']
    },
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
};
