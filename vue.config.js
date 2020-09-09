module.exports = {
  devServer: {
    port: 3033,
    host: "0.0.0.0",
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    //配置多个代理的话，直接在proxy写就可以
    proxy: {
      "/api/*": {
        target: "http://192.168.2.221:8095",
        ws: true,
        changeOrigin: true,
        timeout: 1920000,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
