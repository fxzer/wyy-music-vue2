//通过判断是否为生产环境,设置不同的请求地址
const isProduction = process.env.NODE_ENV === 'production'
console.log('isProduction: ', isProduction);
const target = isProduction ? 'http://www.coderfxj.site:3000' : 'http://127.0.0.1:3000'
console.log('target: ', target);
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: target,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}