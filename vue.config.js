//通过判断是否为生产环境,设置不同的请求地址
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  publicPath: isProduction ? "./" : "/music",
  outputDir: process.env.OUTPUT_DIR,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
