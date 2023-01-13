//通过判断是否为生产环境,设置不同的请求地址
const isProduction = process.env.NODE_ENV === "production";
console.log("%c [ isProduction ]-3", "font-size:14px; background:#4e7b39; color:#92bf7d;", isProduction);
module.exports = {
  publicPath: isProduction ? "./" :'/',
  outputDir:process.env.OUTPUT_DIR,
  
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
