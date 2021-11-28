const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const webpack = require('webpack');
const Dotenv = require('dotenv').config({ path: './.env' });
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "ter",
    projectName: "example",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins:[
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env)
      }),
        ],
    devServer: {
      port: process.env.PORT
    },
   
    // modify the webpack config however you'd like to by adding to this object
  });
};
