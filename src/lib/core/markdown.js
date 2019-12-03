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

const makeSafe = function (label) {
  return label.replace(/[^\w\s]/gi, '').split(' ').join('_');
};
md.renderer.rules.code_block = function (tokens, idx, options, env, slf) {
  let token = tokens[idx];
  console.log(parseInt(token.map[0]) + 1)
  return '<pre class="hljs"' + ' data-source-' + (parseInt(token.map[0]) + 1) + slf.renderAttrs(token) + '><code>' +
    md.utils.escapeHtml(tokens[idx].content) +
    '</code></pre>\n';
};
md.renderer.rules.heading_open = function (tokens, index) {
  let level = tokens[index].tag;
  let label = tokens[index + 1];
  if (label.type === 'inline') {
    let anchor = makeSafe(label.content) + '_' + label.map[0];
    return '<' + level + ' data-source-' + (parseInt(label.map[0]) + 1) + '><a id="' + anchor + '"></a>';
  } else {
    return '</h1>';
  }
};

md.renderer.rules.paragraph_open = function (tokens, idx) {
  let label = tokens[idx + 1];
  return '<p' + ' data-source-' + (parseInt(label.map[0]) + 1) + '>'
};

md.renderer.rules.hr = function (tokens, idx) {
  let label = tokens[idx];
  return '<hr' + ' data-source-' + (parseInt(label.map[1])) + '></hr>'
};

md.renderer.rules.blockquote_open = function (tokens, idx) {
  let label = tokens[idx];
  return '<blockquote' + ' data-source-' + (parseInt(label.map[1])) + '>'
};

md.renderer.rules.table_open = function (tokens, idx) {
  let label = tokens[idx];
  return '<table' + ' data-source-' + (parseInt(label.map[0] + 1)) + '>'
};

md.renderer.rules.bullet_list_open = function (tokens, idx) {
  let label = tokens[idx];
  return '<ul' + ' data-source-' + (parseInt(label.map[0] + 1)) + '>'
};

md.renderer.rules.ordered_list_open = function (tokens, idx) {
  let label = tokens[idx];
  return '<ol' + ' data-source-' + (parseInt(label.map[0] + 1)) + '>'
};


// var gstate;
// md.renderer.rules.toc_body = function replace(tokens, index) {
//   // but this seems the only reliable way to identify headings
//   let headings = [];
//   let gtokens = gstate.tokens;
//   let size = gtokens.length;
//   for (var i = 0; i < size; i++) {
//     if (gtokens[i].type !== 'heading_close') {
//       continue;
//     }
//     let token = gtokens[i];
//     let heading = gtokens[i - 1];
//     if (heading.type === 'inline') {
//       headings.push({
//         level: +token.tag.substr(1, 1),
//         anchor: makeSafe(heading.content) + '_' + heading.map[0],
//         content: heading.content
//       });
//     }
//   }
//
//   let indent = 0;
//   let list = headings.map(function (heading) {
//     let res = [];
//     if (heading.level > indent) {
//       let ldiff = (heading.level - indent);
//       for (let i = 0; i < ldiff; i++) {
//         res.push('<ul>');
//         indent++;
//       }
//     } else if (heading.level < indent) {
//       let ldiff = (indent - heading.level);
//       for (let i = 0; i < ldiff; i++) {
//         res.push('</ul>');
//         indent--;
//       }
//     }
//     res = res.concat(['<li><a href="#', heading.anchor, '">', heading.content, '</a></li>']);
//     return res.join('');
//   });
//
//   return '<h3>' + tokens[index].content + '</h3>' + list.join('') + new Array(indent + 1).join('</ul>');
// };
// md.core.ruler.push('grab_state', function(state) {
//   gstate = state;
// });
// md.inline.ruler.after('emphasis', 'toc', toc);


export default md
