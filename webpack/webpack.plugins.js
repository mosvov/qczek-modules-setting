const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyPlugin({
    //temporal solution to fix https://github.com/electron-userland/electron-forge/issues/1451
    patterns: [
      {
        from: 'node_modules/@serialport/bindings',
        to: '../native_modules',
      },
        {
            from: 'node_modules/rc-slider/assets/index.css',
            to: './main_window',
        },
    ],
  }),
];


