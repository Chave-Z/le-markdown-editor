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
import typeOf  from '../utils/typeof'

var md;

function MarkDown () {}

MarkDown.init = function init(options){
  md = require('markdown-it')(options);
  MarkDown
    .use(emoji, MarkDown.getPluginOptions('emoji', options))
    .use(deflist, MarkDown.getPluginOptions('deflist', options))
    .use(taskLists, MarkDown.getPluginOptions('taskLists', options))
    .use(container, MarkDown.getPluginOptions('container', options))
    .use(mark, MarkDown.getPluginOptions('mark', options))
    .use(ins, MarkDown.getPluginOptions('ins', options))
    .use(container, 'le-left', MarkDown.getPluginOptions('container', options)) /* align left */
    .use(container, 'le-center', MarkDown.getPluginOptions('container', options)) /* align center */
    .use(container, 'le-right', MarkDown.getPluginOptions('container', options)) /* align right */
    .use(sub, MarkDown.getPluginOptions('sub', options))
    .use(sup, MarkDown.getPluginOptions('sup', options))
    .use(katex, MarkDown.getPluginOptions('katex', options))
    .use(footnote, MarkDown.getPluginOptions('footnote', options))
    .use(abbr, MarkDown.getPluginOptions('abbr', options))
    .use(toc, MarkDown.getPluginOptions('toc', options))
    .use(code, MarkDown.getPluginOptions('code', options))
    .configRules()
  return MarkDown;
}

/**
 * 获取各个插件的默认配置
 * @param pluginName 插件名称
 * @param options 传递的配置对象
 * @return {null|*}
 */
MarkDown.getPluginOptions = function (pluginName, options) {
  if(typeOf(options) == 'object' && typeOf(options['plugins']) == 'object') {
    return options['plugins'][pluginName];
  }
  return null;
}

MarkDown.render = function (src, env) {
  return md ? md.render(src, env) : null;
}

/**
 * 向 MD 注入插件
 * @param plugin 插件对象
 * @return {MarkDown}
 */
MarkDown.use = function () {
  md && md.use.apply(md, arguments);
  return MarkDown;
}

MarkDown.configRules = function () {
  if(md) {
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
  }
  return MarkDown;
}


export default MarkDown
