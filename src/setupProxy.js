const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    // app.use(
    //     proxy('/springBoot', {
    //         target: 'http://120.79.101.115/springBoot',
    //         changeOrigin: true,
    //         pathRewrite: {
    //             "^/springBoot": ""
    //         }
    //     })
    // )

    app.use(
        proxy('/springBoot', {
            target: 'http://localhost:8088',
            changeOrigin: true,
            pathRewrite: {
                "^/springBoot": ""
            }
        })
    )

}