module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

    productionSourceMap: false,

    lintOnSave: false,
    devServer: {
        port: 8080
    },
    configureWebpack: {
        externals: {
            'jquery' : '$',
            'echarts': 'echarts',
            'axios' : 'axios'
        }
    }
}