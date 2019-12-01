
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
})
  .use(emoji)
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

console.log(md.renderer.rules)
// md.renderer.rules.code_block = function(tokens, index) {
// var level = tokens[index].tag;
// var label = tokens[index + 1];
// if (label.type === 'inline') {
//   var anchor = makeSafe(label.content) + '_' + label.map[0];
//   return '<' + level + ' class="h"><a id="' + anchor + '"></a>';
// } else {
//   return '</h1>';
// }
// };
// {name: "table", enabled: true, fn: ƒ, alt: Array(2)}
// 1: {name: "code", enabled: true, fn: ƒ, alt: Array(0)}
// 2: {name: "fence", enabled: true, fn: ƒ, alt: Array(4)}
// 3: {name: "blockquote", enabled: true, fn: ƒ, alt: Array(4)}
// 4: {name: "hr", enabled: true, fn: ƒ, alt: Array(4)}
// 5: {name: "list", enabled: true, fn: ƒ, alt: Array(3)}
// 6: {name: "reference", enabled: true, fn: ƒ, alt: Array(0)}
// 7: {name: "heading", enabled: true, fn: ƒ, alt: Array(3)}
// 8: {name: "lheading", enabled: true, fn: ƒ, alt: Array(0)}
// 9: {name: "html_block", enabled: true, fn: ƒ, alt: Array(3)}
// 10: {name: "paragraph", enabled: true, fn: ƒ, alt: Array(0)}
// md.block.ruler.before('table', 'my_rule', function replace(state) {
//  console.log(state)
// });

export default md
