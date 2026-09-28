const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, "./path"),
  devServer: {
    host: "0.0.0.0",
    // https: false,
    // hotOnly: false,
    port: 8080,
    proxy: {
      "api/*": {
        target: "https://youarethe.co.kr",
      },
    },
    // proxy: "http://192.168.0.9:3000",
    disableHostCheck: true,
  },
};
