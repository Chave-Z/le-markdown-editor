
const code = require('./code-plugin.js')
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

console.log(md.renderer.rules)

const makeSafe = function(label) {
  return label.replace(/[^\w\s]/gi, '').split(' ').join('_');
};
md.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
  let token = tokens[idx];
  console.log(token)
  console.log(parseInt(token.map[0]) + 1)
  return  '<pre class="hljs"' + ' data-source-'+ (parseInt(token.map[0]) + 1) + slf.renderAttrs(token) + '><code>' +
    md.utils.escapeHtml(tokens[idx].content) +
    '</code></pre>\n';
};
md.renderer.rules.heading_open = function(tokens, index) {
  let level = tokens[index].tag;
  let label = tokens[index + 1];
  if (label.type === 'inline') {
    let anchor = makeSafe(label.content) + '_' + label.map[0];
    return '<' + level + ' data-source-'+ (parseInt(label.map[0]) + 1) + '><a id="' + anchor + '"></a>';
  } else {
    return '</h1>';
  }
};

export default md
