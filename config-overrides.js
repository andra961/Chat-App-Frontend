//overrides the webpack config using react-app-rewired
//adds fallback for crypto, buffer, stream used by "unique-username-generator"
const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
  };

  return config;
};
