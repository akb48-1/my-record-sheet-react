const proxy = require('http-proxy-middleware')

module.exports = function(app) {

  app.use(
    proxy('/api', {
      target: 'http://120.79.101.155:80/MySpringMvc',
      changeOrigin: true
    })
  )

}