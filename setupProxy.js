const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://10.70.2.34:4444/api/v1/',
        changeOrigin: true,
      })
    );
  };