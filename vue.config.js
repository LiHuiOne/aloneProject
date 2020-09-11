//使用Gzip压缩，提高加载速度
//npm install --save-dev compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
  'js-cookie': 'Cookies',
  'nprogress': 'NProgress',
}
//使用CDN文件，按需加载部分插件，减少流量压力
const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://cdn.staticfile.org/element-ui/2.13.0/theme-chalk/index.css',
      'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
    ],
    js: [
    ]
  },
  // 生产环境
  build: {
    css: [
      'https://cdn.staticfile.org/element-ui/2.13.0/theme-chalk/index.css',
      'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
    ],
    js: [
      'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
      'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
      'https://cdn.staticfile.org/vuex/3.1.1/vuex.min.js',
      'https://cdn.staticfile.org/axios/0.18.0/axios.min.js',
      'https://cdn.staticfile.org/js-cookie/2.2.1/js.cookie.min.js',
      'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js',
      'https://cdn.staticfile.org/element-ui/2.12.0/index.js'
    ]
  }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
module.exports = {
  lintOnSave: false,//你是否使用eslint规范
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals

      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.7,
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
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
    },
  },
   //注入全局通用样式,配置全局样式变量
  css: {
    //打包后对代码压缩或者转换，导致与源码有些不同,sourceMap里面储存着位置信息,存储源代码与编译代码对应位置映射。
    //也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
    //有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    sourceMap: true,//跟踪css文件
    //css预设器配置项
    loaderOptions: {
        less: {
            modifyVars: {
                "primary-color": "#1DA57A",
                "link-color": "#1DA57A",
                "border-radius-base": "2px"
            },
            javascriptEnabled: true
        },
        sass:{
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v7 中，这个选项名是 "data"
          //data: `@import "@/assets/style/common/variables.scss";`
        }
    }
  },
   // 三方插件的选项
  pluginOptions: {
    // ...
  }
};
