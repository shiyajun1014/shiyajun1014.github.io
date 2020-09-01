const path = require('path')
const crcodeLoader = require.resolve('./lib/crcode-loader.js')

module.exports = {
  plugins: [
    ['@vuepress/google-analytics', {
      ga: 'UA-119776733-1'
    }],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '个人博客',
      description: '我的精神角落'
    }
  },
  head: [
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:description', content: '基礎から学ぶ Vue.js サポートページ' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '基礎から学ぶ Vue.js' }],
    ['meta', { property: 'og:title', content: '基礎から学ぶ Vue.js' }],
    ['meta', { property: 'og:image', content: 'https://cr-vue.mio3io.com/summary.png' }],
    ['link', { rel: 'icon', href: '/icon.png' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '开始探索', link: '/guide/' },
      { text: 'Demo演示', link: '/examples/' },
      { text: '关于我', link: '/tutorials/' },
    ],

    sidebar: {
      '/guide/': [
        '',
        'preface.md',
        'chapter1.md',
        'chapter2.md',
        'chapter3.md',
        'chapter4.md',
        'chapter5.md',
        'chapter6.md',
        'chapter7.md',
        'chapter8.md',
        'chapter9.md'
      ],
      '/examples/': [
        '',
        'tab.md',
        'modal.md',
        'loading.md',
        'delay-transition.md',
        'text-animation.md',
        'canvas.md',
      ],
      '/tutorials/': [
        '',
        'todo.md',
        'firebase.md',
        'netlify.md',
      ]
    },
    repo: 'redeememer/blog',
    repoLabel: 'GitHub',
    docsRepo: 'redeememer/blog',
    docsDir: 'docs',
    editLinks: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@docs', path.resolve(__dirname, '../'))
    config.module
      .rule('crcode').pre().test(/\.md$/).use('crcode').loader(crcodeLoader)
  }
}
