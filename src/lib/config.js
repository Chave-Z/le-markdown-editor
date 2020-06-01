import en from './lang/en/words.json'
import zh_CN from './lang/zh_CN/words.json'
const config = {
  langList: ['en', 'zh_CN'],
  words: { en, zh_CN },
  font: {
    editor: 16,
    preview: 16
  },
  imageType: ['jpg', 'jpeg', 'gif', 'png', 'bmp'],
  dragUpload: true,
  imageUploader: {
    custom: false,
    fileType: '',
    fileNameType: 'uuid',
    imagePrefix: 'https://cdn.jsdelivr.net/gh/', // 图片前缀地址
    type: '',
    url: '',
    token: '',
    username: '',
    repo: ''
  },
  toolbar: {
    undo: true, // 撤销
    redo: true, // 重做
    bold: true, // 粗体
    del: true, // 删除线
    underline: true, // 下划线
    italic: true, // 斜体
    quote: true, // 引用
    bookmark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    h1: true, // 标题1
    h2: true, // 标题2
    h3: true, // 标题3
    h4: true, // 标题4
    h5: true, // 标题5
    h6: true, // 标题6
    alignLeft: true, // 居左
    alignCenter: true, // 居中
    alignRight: true, // 居右
    ol: true, // 有序列表
    ul: true, // 无序列表
    hr: true, // 分隔线
    link: true, // 链接
    inlineCode: true, // 行内代码
    code: true, // 代码块
    image: true, // 图片
    table: true, // 表格
    // time: false, // 时间
    // clear: false, // 清除
    skin: true, // 全屏编辑
    fullScreenEdit: true, // 全屏编辑
    fullScreen: true, // 全窗口预览
    preview: true,  // 实时预览
    save: true,  // 保存预览的html文本
    // download: true
  }
}
export default config
