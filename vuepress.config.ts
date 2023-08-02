import { defineUserConfig } from 'vuepress'
import CodeCopyPulgin from 'vuepress-code-copy'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'HITwh 自动评教脚本',
  description: 'Author：Araden',
  plugins: [
    CodeCopyPulgin({
      copyText: '点此复制',
      copiedText: '复制成功'
    })
  ]
})
