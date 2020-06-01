const code = require('./code-plugin.js')
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const katex = require('markdown-it-katex')
const deflist = require('markdown-it-deflist')
const taskLists = require('markdown-it-task-lists') // 任务清单
const toc = require('markdown-it-toc') // @[toc](Title)
const emoji = require('markdown-it-emoji')
const footnote = require('markdown-it-footnote')
const container = require('markdown-it-container')
const abbr = require('markdown-it-abbr')
const mark = require('markdown-it-mark')
const ins = require('markdown-it-ins')
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
}).use(emoji)
  .use(deflist)
  .use(taskLists)
  .use(container)
  .use(mark)
  .use(ins)
  .use(container, 'le-left') /* align left */
  .use(container, 'le-center')/* align center */
  .use(container, 'le-right')/* align right */
  .use(sub)
  .use(sup)
  .use(katex)
  .use(footnote)
  .use(abbr)
  .use(toc)
  .use(code)

// console.log(md.renderer.rules)

const makeSafe = function (label) {
  return label.replace(/[^\w\s]/gi, '').split(' ').join('_')
}
md.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
  const token = tokens[idx]
  return '<pre class="hljs"' + ' data-source="' + (parseInt(token.map[0]) + 1) + '"' + slf.renderAttrs(token) + '><code>' +
    md.utils.escapeHtml(tokens[idx].content) +
    '</code></pre>\n'
}
md.renderer.rules.heading_open = function (tokens, index) {
  const level = tokens[index].tag
  const label = tokens[index + 1]
  if (label.type === 'inline') {
    const anchor = makeSafe(label.content) + '_' + label.map[0]
    return '<' + level + ' data-source="' + (parseInt(label.map[0]) + 1) + '"><a id="' + anchor + '"></a>'
  } else {
    return '</h1>'
  }
}

md.renderer.rules.paragraph_open = function (tokens, idx) {
  const label = tokens[idx + 1]
  return '<p' + ' data-source="' + (parseInt(label.map[0]) + 1) + '">'
}

md.renderer.rules.hr = function (tokens, idx) {
  const label = tokens[idx]
  return '<hr' + ' data-source="' + (parseInt(label.map[1])) + '"></hr>'
}

md.renderer.rules.blockquote_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<blockquote' + ' data-source="' + (parseInt(label.map[1])) + '">'
}

md.renderer.rules.table_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<table' + ' data-source="' + (parseInt(label.map[0] + 1)) + '">'
}

md.renderer.rules.bullet_list_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<ul' + ' data-source="' + (parseInt(label.map[0] + 1)) + '">'
}

md.renderer.rules.ordered_list_open = function (tokens, idx) {
  const label = tokens[idx]
  return '<ol' + ' data-source="' + (parseInt(label.map[0] + 1)) + '">'
}

var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // 获取属性target的索引号，如果小于0说明没有该属性
  var aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']) // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
  }
  return defaultRender(tokens, idx, options, env, self)
}

export default md
