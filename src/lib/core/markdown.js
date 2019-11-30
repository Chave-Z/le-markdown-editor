
const flow = require('./flow-plugin.js')
const hljs = require('highlight.js') // https://highlightjs.org/
// 通常的默认值们
const sub = require('markdown-it-sub')
const sup = require('markdown-it-sup')
const katex = require('markdown-it-katex')
const deflist = require('markdown-it-deflist')
const taskLists = require('markdown-it-task-lists'); // 任务清单
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
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) { }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
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
  .use(flow)

export default md
