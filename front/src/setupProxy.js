const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(    
    createProxyMiddleware('/api',{
      target: 'http://k9b310.p.ssafy.io:8080',
      changeOrigin: true,
    })
  );
};