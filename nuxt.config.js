export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no'},
      { hid: 'description', name: 'description', content: '' }
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
  ],
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src:'@/plugins/element-ui'},
    {src:'@/plugins/axios'},
    {src:'@/assets/iconfont/iconfont.js',ssr:false},
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

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    vendor: ['axios'] //为防止重复打包
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