export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '马鲁南的个人It技术博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no'},
      { name: 'baidu-site-verification', content: 'bdukCluk30'},
      { name: 'sogou_site_verification', content: 'gReIJbnqBO'},
      { name: 'author', content: 'malunan'},
      { name: 'keywords', content: '个人博客,技术博客,前端博客,个人网站,个人博客模板,个人原创网站'},
      { hid: 'description', name: 'description', content: '马鲁南个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ],
    script:[
     
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/css/main.less',
    '~assets/css/Media.less',
    '@/assets/iconfont/iconfont.css',
    'element-ui/lib/theme-chalk/index.css',
    'wowjs/css/libs/animate.css',
    'animate.css/animate.css',
  ],
  script:[
    {src:'@/assets/iconfont/iconfont.js'}
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src:'@/plugins/element-ui'},
    {src:'@/plugins/axios'},
    // {src:'@/assets/iconfont/iconfont.js',ssr:false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  
  loader:[
    {
        test:/\.less$/,
        loaders:'style-loader!css-loader!less-loader'
    }, 
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
 ],
 modules: [
  '@nuxtjs/axios','@nuxtjs/proxy',
  '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: '@/assets/css/global.less'
  },
  axios: {
      proxy: true, // 表示开启代理
      prefix: '/api', // 表示给请求url加个前缀 /api
      credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // 目标接口域名
      // target: 'https://www.zmln1021.cn:3000', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    }
  },
  build: {
    transpile: [/^element-ui/],
    // analyze:true,
    // analyze: {
    //   analyzerMode: ['static','ssets/iconfon@/at']
    // },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: ['axios','element-ui','prismjs','wowjs'] //为防止重复打包
  },
  render:{
    resourceHints: false,
  }
  
}
//  判断是路由跳转还是 axios 请求
// if (process.server) {
//   config.baseURL = `${
//     process.env.ENV !== "production"
//       ? process.env.DEV_API
//       : process.env.PROD_API
//   }`;
//   console.log(config.baseURL);
// }