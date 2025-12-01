import type { MarkdownItEnv } from '@mdit-vue/types'
import type MarkdownIt from 'markdown-it'
import pathe from 'pathe'

declare module '@mdit-vue/types' {
  interface MarkdownItEnv {
    id?: string
  }
}

function checkWrapper(content: string, wrapper = 'demo'): boolean {
  // 匹配 <demo 后面接空格、斜杠或大于号（忽略大小写）
  const REGEX_CHECK = new RegExp(`<${wrapper}(\\s|>|/)`, 'i')
  return REGEX_CHECK.test(content)
}

function replaceSrcPath(content: string, id: string, root: string, wrapper = 'demo') {
  const REGEX_TAG = new RegExp(`(<${wrapper}\\b[^>]*>)`, 'gi')

  return content.replace(REGEX_TAG, (tagMatch) => {
    return tagMatch.replace(/(\s|^)src=(['"])(.*?)\2/gi, (srcMatch, prefix, quote, srcValue) => {
      if (!srcValue)
        return srcMatch

      const dir = pathe.dirname(id)
      const filePath = pathe.resolve(dir, srcValue)
      const relative = pathe.relative(root, filePath)
      const newSrc = relative.startsWith('/') ? relative : `/${relative}`

      return `${prefix}src=${quote}${newSrc}${quote}`
    })
  })
}

export function demoPlugin(md: MarkdownIt, config: { root?: string } = {}) {
  // 保存原始 render 函数
  const originalRender = md.renderer.render

  md.renderer.render = function (tokens, options, env: MarkdownItEnv) {
    const root = config.root ?? process.cwd()
    const currentId = env.id || ''

    // 遍历所有 token
    for (const token of tokens) {
      // 1. 处理块级 HTML (html_block)
      if (token.type === 'html_block' && checkWrapper(token.content)) {
        token.content = replaceSrcPath(token.content, currentId, root)
      }

      else if (token.type === 'inline' && token.children) {
        for (const child of token.children) {
          if (child.type === 'html_inline' && checkWrapper(child.content)) {
            child.content = replaceSrcPath(child.content, currentId, root)
          }
        }
      }
    }

    return originalRender.call(this, tokens, options, env)
  }
}
