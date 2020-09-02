const path = require('path')
const crcodeLoader = require.resolve('./lib/crcode-loader.js')

module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '阿君记事',
      description: '站在人文与科技的十字路口',
    },
  },
  head: [['link', { rel: 'icon', href: '/icon.png' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '个人作品', link: '/examples/' },
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
        'chapter9.md',
      ],
      '/examples/': ['', 'tab.md', 'modal.md', 'loading.md', 'delay-transition.md', 'text-animation.md', 'canvas.md'],
      '/tutorials/': ['', 'todo.md', 'firebase.md', 'netlify.md'],
    },
    repo: 'redeememer/blog',
    repoLabel: 'GitHub',
    docsRepo: 'redeememer/blog',
    docsDir: 'docs',
    editLinks: false,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@docs', path.resolve(__dirname, '../'))
    config.module
      .rule('crcode')
      .pre()
      .test(/\.md$/)
      .use('crcode')
      .loader(crcodeLoader)
  },
}
