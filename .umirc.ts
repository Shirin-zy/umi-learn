import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dva: {},
  antd: {},
  proxy: {
    '/api': {
      //---step1设置了需要代理的请求头，比如这里定义了 /api ，当你访问如 /api/abc 这样子的请求，就会触发代理
      target: 'https://pvp.qq.com', //---step2设置代理的目标，即真实的服务器地址
      changeOrigin: true, //---step3设置是否跨域请求资源
      pathRewrite: { '^/api': '' }, //---step4表示是否重写请求地址，比如这里的配置，就是把 /api 替换成空字符
    },
  },
});
