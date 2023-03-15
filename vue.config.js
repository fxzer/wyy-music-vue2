//通过判断是否为生产环境,设置不同的请求地址

module.exports = {
  publicPath: process.env.BASE_URL,
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
