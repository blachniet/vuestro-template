const webpack = require('webpack');
const { merge } = require('webpack-merge');
const devWebpackConfig = require('./node_modules/vuestro/build/webpack.dev.config');
const child_process = require('child_process');

let gitHash = child_process.execSync('git rev-parse --short=8 HEAD');

module.exports = merge(devWebpackConfig, {
  devServer: {
    port: process.env.DASHBOARD_PORT || 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      //
      // This is where globals are defined for the DEV client-side
      // Production will use a static method of defining these values through start-nginx.sh and config.js
      //
      BACKEND_URL: JSON.stringify(process.env.BACKEND_URL || 'http://localhost:8081'),
      CI_BUILD_DATE: JSON.stringify(new Date()),
      CI_VERSION: JSON.stringify(`dev@${gitHash}`),
    }),
  ],
});