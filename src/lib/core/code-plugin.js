const hljs = require('highlight.js') // https://highlightjs.org/
module.exports = function flow (md) {
  // const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    token.info = token.info.trim()
    if (token.info.startsWith('flow')) {
      const temps = token.info.split(/\s+/)
      let str = ''
      if (temps.length === 1) {
        str = `<div class="md-flowchart" ${' data-source="' + parseInt(token.map[0] + 1) + '"'}>${code}</div>`
      } else if (temps.length === 2) {
        temps[1] = temps[1].indexOf('px') !== -1 ? temps[1] : (temps[1] + '%')
        str = `<div class="md-flowchart" ${' data-source="' + parseInt(token.map[0] + 1) + '"'} style="` + 'width:' + temps[1] + `">${code}</div>`
      } else if (temps.length >= 3) {
        temps[1] = temps[1].indexOf('px') !== -1 ? temps[1] : (temps[1] + '%')
        temps[2] = temps[2].indexOf('px') !== -1 ? temps[2] : (temps[2] + '%')
        str = `<div class="md-flowchart" ${' data-source="' + parseInt(token.map[0] + 1) + '"'} style="` + 'width:' + temps[1] + ';height:' + temps[2] + `">${code}</div>`
      }
      return str
    } else {
      const lang = token.info
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"' + ' data-source="' + (parseInt(token.map[0] + 1)) + '"><code>' +
            hljs.highlight(lang, code, true).value +
            '</code></pre>'
        } catch (__) { }
      }
      return '<pre class="hljs"' + ' data-source="' + (parseInt(token.map[0] + 1)) + '"><code>' + md.utils.escapeHtml(code) + '</code></pre>'
    }
    // return temp(tokens, idx, options, env, slf)
  }
}
