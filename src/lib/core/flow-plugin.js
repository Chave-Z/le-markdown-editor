module.exports = function flow (md) {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const code = token.content.trim()
    token.info = token.info.trim()
    if (token.info.startsWith('flow')) {
      const temps = token.info.split(/\s+/)
      let str = ''
      if (temps.length === 1) {
        str = `<div class="md-flowchart">${code}</div>`
      } else if (temps.length === 2) {
        temps[1] = temps[1].indexOf('px') !== -1 ? temps[1] : (temps[1] + '%')
        str = `<div class="md-flowchart" style="` + 'width:' + temps[1] + `">${code}</div>`
      } else if (temps.length >= 3) {
        temps[1] = temps[1].indexOf('px') !== -1 ? temps[1] : (temps[1] + '%')
        temps[2] = temps[2].indexOf('px') !== -1 ? temps[2] : (temps[2] + '%')
        str = `<div class="md-flowchart" style="` + 'width:' + temps[1] + ';height:' + temps[2] + `">${code}</div>`
      }
      return str
    }
    return temp(tokens, idx, options, env, slf)
  }
}