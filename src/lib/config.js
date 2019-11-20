import en from './lang/en/words.json'
import zh_CN from './lang/zh_CN/words.json'
const config = {
  langList: ['en', 'zh_CN'],
  words: { en, zh_CN },
  toolbars: {
    bold: true,
    italic: true,
    header: true,
    underline: true,
    strikethrough: true,
    mark: true,
    superscript: true,
    subscript: true,
    quote: true,
    ol: true,
    ul: true,
    link: true,
    imagelink: true,
    code: true,
    table: true,
    undo: true,
    redo: true,
    trash: true,
    save: true,
    alignleft: true,
    aligncenter: true,
    alignright: true,
    navigation: true,
    subfield: true,
    fullscreen: true,
    readmodel: true,
    htmlcode: true,
    help: true,
    preview: true
  }
}
export default config
