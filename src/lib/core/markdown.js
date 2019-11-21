
var flow = require('./flow-plugin.js')
var hljs = require('highlight.js') // https://highlightjs.org/
// 通常的默认值们
var sub = require('markdown-it-sub')
var sup = require('markdown-it-sup')
var katex = require('markdown-it-katex')
var deflist = require('markdown-it-deflist')
var taskLists = require('markdown-it-task-lists'); // 任务清单
var toc = require('markdown-it-toc') // @[toc](Title)
var emoji = require('markdown-it-emoji')
var footnote = require('markdown-it-footnote')
var container = require('markdown-it-container')
var abbr = require('markdown-it-abbr')
var mark = require('markdown-it-mark')
var ins = require('markdown-it-ins')
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
