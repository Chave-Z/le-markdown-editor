<style lang="css" scoped>
@import "./index.css";
@import "./menu.css";
</style>
<template>
  <div class="md-container"
       :class="{'md-shadow':shadow,'md-border':!shadow,'fullStyle':fullScreenEditFlag}">
    <toolbar ref="toolbar"
             :themes="themes"
             @operate="operate"
             @insertImg="insertImg"
             @insertTable="insertTable"
             @preview="preview"
             @fullScreen="fullScreen"
             @fullScreenEdit="fullScreenEdit"
             @setTheme="setTheme"
             @save="savePreview"
             :toolbar="toolbar"></toolbar>
    <div class="le-editor-container">
      <div class="le-editor-left">
        <textarea ref="editor"
                  id="my-textarea"
                  placeholder="输入数据..."></textarea></div>
      <transition name="le-editor-right-animation">
        <div class="le-editor-right"
             :class="{'fullStyle':fullScreenFlag}"
             v-show="previewFlag">
          <a href="javascript:;"
             v-if="fullScreenFlag"
             @click="fullScreen()">
            <i class="fa fa-window-close-o"></i></a>
          <le-preview :style="{fontSize:font.preview + 'px'}" :hljsCss="hljsCss" :value="html"
                      ref="markdownBody"></le-preview>
          <!--          <le-preview :style="{fontSize:config.font.preview + 'px'}" :hljsCss="hljsCss" :is-md="true" :value="origin" ref="markdownBody"></le-preview>-->
          <!--                    <div class="markdown-body"-->
          <!--                         ref="markdownBody"-->
          <!--                         :style="{fontSize:config.font.preview + 'px'}"-->
          <!--                         v-html="html"></div>-->
        </div>
      </transition>
    </div>
    <div class="loader-modal"
         v-if="loaderFlag">
      <div class="loader">
        <span class="spinner"></span>
      </div>
    </div>
    <le-context-menu class="le-right-menu"
                     :target="contextMenuTarget"
                     :show="contextMenuVisible"
                     @update:show="(show) => contextMenuVisible = show">
      <!--      <a href="javascript:;">全选</a>-->
      <!--      <a href="javascript:;">复制</a>-->
      <!--      <a href="javascript:;">粘贴</a>-->
      <a href="javascript:;" @mouseenter="imageSubMenuFlag=true" @mouseleave="imageSubMenuFlag=false">图片操作
        <div v-if="imageSubMenuFlag" class="img-menu">
          <a href="javascript:;" @click="changeImgSize(25)">25%</a>
          <a href="javascript:;" @click="changeImgSize(33)">33%</a>
          <a href="javascript:;" @click="changeImgSize(55)">55%</a>
          <a class="dividing-line" href="javascript:;" @click="changeImgSize(67)">67%</a>
          <a class="dividing-line" href="javascript:;" @click="changeImgSize(100)">100%</a>
          <a href="javascript:;" @click="changeImgSize(150)">150%</a>
          <a class="dividing-line" href="javascript:;" @click="changeImgSize(200)">200%</a>
          <a href="javascript:;" @click="changeImgSize(-1)">自定义</a>
        </div>
      </a>
    </le-context-menu>

  </div>
</template>
<script>
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/search/matchesonscrollbar.css'
import 'codemirror/addon/hint/show-hint.css'
import CodeMirror from 'codemirror'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/mode/markdown/markdown'
import {insertImg, insertTable, simpleClick} from '../../lib/core/toolbar_click'
import md from '../../lib/core/markdown'
import config from '../../lib/config'
import {uploadToGithub, uploadToServer} from '../../lib/utils/upload'
// 自定义组件
import toolbar from '../toolbar/toolbar.vue'
import LePreview from "../preview/le-preview"
import LeContextMenu from "../menu/le-context-menu"

export const themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn']
themes.forEach((theme) => {
  require(`codemirror/theme/${theme}.css`)
})
export default {
  name: 'le-editor',
  components: {
    LePreview,
    toolbar,
    LeContextMenu
  },
  model: {
    prop: 'value',//指向props的参数名
    event: 'change'//事件名称
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    hljsCss: {
      type: String,
      default: "github"
    },
    font: {
      type: Object,
      default() {
        return config.font
      }
    },
    theme: {
      type: String,
      default: localStorage.getItem('theme') === null ? 'material' : localStorage.getItem('theme')
    },
    // 工具栏是否显示
    shadow: {
      type: Boolean,
      default: true
    },
    // 工具栏是否显示
    showToolbar: {
      type: Boolean,
      default: true
    },
    // 工具栏内部功能及快捷键
    toolbar: {
      type: Object,
      default() {
        return config.toolbar
      }
    },
    // 全屏编辑
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 图片上传配置
    imageUploader: {
      type: Object,
      default() {
        return {};
      }
    },
    indentUnit:{
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      config: config,
      themes: themes,
      placeholders: '', // 占位符
      previewFlag: true,
      fullScreenFlag: false,
      fullScreenEditFlag: false,
      imageMenuFlag: false,
      imageSubMenuFlag: false,
      origin: '',
      html: '',
      // history: [],
      // historyIndex: -1,
      // historyPushFlag: true,
      timer: null,
      files: [],
      editor: null,
      loaderFlag: false,
      // 右键菜单
      contextMenuTarget: null, //绑定的dom
      contextMenuVisible: false,
      imagePattern: /^!\[(.*)\]\((.*)\)$/,
      linkImagePattern: /^\[!\[(.*)\]\((.*)\)\]\(.*\)$/,
    }
  },
  watch: {
    //监听值变化，再赋值给value
    origin(value) {
      this.$emit('change', value);
    },
    value(value) {
      if (this.origin !== value) {
        this.editor.setValue(value)
      }
    },
    loaderFlag: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('touchmove', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, {passive: false})
      } else {
        document.body.style.overflow = ''
        document.addEventListener('touchmove', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, {passive: true})
      }
    }
  },
  methods: {
    initEditor() {
      // 初始化
      let that = this
      this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
        lineNumbers: true,
        mode: 'markdown',
        theme: that.theme,
        lineWrapping: true,
        scrollPastEnd: true,
        autofocus: true,
        styleActiveLine: {nonEmpty: true},
        // tabSize: 4,
        indentUnit: that.indentUnit,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        dragDrop: true,
        matchBrackets: true
      });
      // tab
      this.editor.setOption("extraKeys", {
        Tab: (cm) => {
          if (cm.somethingSelected()) {      // 存在文本选择
            cm.indentSelection('add');    // 正向缩进文本
          } else {                    // 无文本选择
            //cm.indentLine(cm.getCursor().line, "add");  // 整行缩进 不符合预期
            cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");  // 光标处插入 indentUnit 个空格
          }
        },
        "Shift-Tab": (cm) => {              // 反向缩进
          if (cm.somethingSelected()) {
            cm.indentSelection('subtract');  // 反向缩进
          } else {
            // cm.indentLine(cm.getCursor().line, "subtract");  // 直接缩进整行
            const cursor = cm.getCursor();
            cm.setCursor({line: cursor.line, ch: cursor.ch - 4});  // 光标回退 indexUnit 字符
          }
          return;
        },
      });
      this.getEditorDom().style.fontSize = (this.font.editor || 16) + 'px'
      if (that.value !== "") {
        that.editor.setValue(that.value)
        that.setMdValue()
      }
      this.editor.on("change", () => {
        that.setMdValue()
      })
      // 滚动渲染
      let timer = null;
      this.editor.on('scroll', (instance) => {
        let mdBodyElement = this.$refs.markdownBody.$el;
        clearTimeout(timer);
        timer = setTimeout(() => {
          const lineMarkers = mdBodyElement.querySelectorAll('.markdown-body > [data-source]')
          const lines = []
          lineMarkers.forEach((element, index) => {
            lines.push(element.getAttribute('data-source'))
          })
          const editorScrollInfo = that.editor.getScrollInfo();
          let mdBody = mdBodyElement.querySelector('.markdown-body')
          if (editorScrollInfo.clientHeight + editorScrollInfo.top === editorScrollInfo.height) {
            let clientHeight = mdBody.clientHeight;
            let scrollHeight = mdBody.scrollHeight;
            mdBody.scrollTop = scrollHeight - clientHeight
          } else {
            const currentPosition = editorScrollInfo.top
            let current
            let next
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i]
              const height = that.editor.heightAtLine(line - 1, 'local')
              if (height < currentPosition) {
                current = line
              } else {
                next = line
                break
              }
            }
            let percentage = 0
            if (current && next && current !== next) {
              percentage = (currentPosition - that.editor.heightAtLine(current - 1, 'local')) / (that.editor.heightAtLine(next - 1, 'local') - that.editor.heightAtLine(current - 1, 'local'))
            }
            let editorScroll = {current: current, next: next, percentage}
            let lastPosition = 0
            let nextPosition = mdBody.scrollHeight - mdBody.clientHeight
            if (editorScroll.current) {
              lastPosition = mdBodyElement.querySelector('.markdown-body > [data-source="' + editorScroll.current + '"]').offsetTop
            }
            if (editorScroll.next) {
              nextPosition = mdBodyElement.querySelector('.markdown-body > [data-source="' + editorScroll.next + '"]').offsetTop
            }
            mdBody.scrollTop = lastPosition + (nextPosition - lastPosition) * editorScroll.percentage
          }
        }, 125)
      })
      // 拖拽事件
      const dropBox = this.getEditorDom();
      dropBox.addEventListener('dragenter', this.onDrag, false);
      dropBox.addEventListener('dragover', this.onDrag, false);
      dropBox.addEventListener('drop', this.onDrop, false);
      dropBox.addEventListener("paste", function (e) {
        let cbd = e.clipboardData;
        if (!(e.clipboardData && e.clipboardData.items)) {
          return;
        }
        for (let i = 0; i < cbd.items.length; i++) {
          let item = cbd.items[i];
          if (item.kind === "file") {
            let file = item.getAsFile();
            if (file.size === 0) {
              return;
            } else {
              that.upload(file)
            }
          }
        }
      });
      // 右键菜单
      this.contextMenuTarget = this.getEditorDom();
    }
    ,
    operate(type) {
      // 点击了工具栏 触发功能
      simpleClick(this, type)
    }
    ,
    insertImg(url, title) {
      // 插入图片
      insertImg(this, {url: url, title: title})
    }
    ,
    insertTable(tableInfo) {
      // 添加表格
      insertTable(this, tableInfo);
    }
    ,
    preview(flag) {
      // 开关实时预览
      this.previewFlag = flag
      this.$el.getElementsByClassName('le-editor-left')[0].style.width = this.previewFlag ? '50%' : '100%'
    }
    ,
    fullScreen() {
      this.preview(true)
      // 全屏
      this.fullScreenFlag = !this.fullScreenFlag
    }
    ,
    fullScreenEdit() {
      // 全屏
      this.fullScreenEditFlag = !this.fullScreenEditFlag
    }
    ,
    setTheme(theme) {
      this.editor.setOption("theme", theme)
      localStorage.setItem('theme', theme)
    }
    ,
    savePreview() {
      this.$emit('save', this.html)
    }
    ,
    initLang() {
      // TODO
      let lang = config.langList.indexOf(this.language) >= 0 ? this.language : 'zh_CN';
      this.placeholders = config.words[`${lang}`].placeholders
    }
    ,
    onDrag: function (e) {
      if (!this.config.dragUpload) {
        return
      }
      e.stopPropagation();
      e.preventDefault();
    }
    ,
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      let dt = e.dataTransfer;
      this.upload(dt.files[0])
    }
    ,
// 上传
    upload(file) {
      let flag = false
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase()
      for (let i = 0; i < this.config.imageType.length; i++) {
        if (this.config.imageType[i] === fileType) {
          flag = true
          break
        }
      }
      if (!flag) return
      let fileName = this.config.imageUploader.fileNameType === 'uuid' ? (this.generateUUID() + '.' + fileType) : file.name;
      if (this.config.imageUploader.custom) {
        // 自定义
        if (this.config.imageUploader.fileType === 'base64') {
          var reader = new FileReader();
          let that = this
          reader.onload = function (e) {
            that.$emit('uploadImg', that, e.target.result, fileName)
          };
          reader.readAsDataURL(file);
        } else {
          this.$emit('uploadImg', this, file, fileName)
        }
      } else {
        if (this.config.imageUploader.type === 'server') {
          uploadToServer(this, file, fileName);
          // for (var i = 0; i !== dt.files.length; i++) {
          //   this.uploadFile(file);
          // }
        } else if (this.config.imageUploader.type === 'github') {
          let that = this
          var reader = new FileReader();
          reader.onload = function (e) {
            uploadToGithub(that, e.target.result, fileName)
          };
          reader.readAsDataURL(file);
        } else {
          alert('图片上传类型有误')
        }
      }
    }
    ,
    generateUUID: function () {
      let d = new Date().getTime();
      if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
      }
      const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
    ,
    setMdValue() {
      // let that = this
      // 这个功能在编辑器中已经有了 所以这里去除
      // clearTimeout(this.timer)
      // // 不延迟会存下很多没有太多意义的历史记录
      // if (this.historyPushFlag) {
      //   this.timer = setTimeout(() => {
      //     that.history.splice(++that.historyIndex, 1, that.origin)
      //   }, 200);
      // }
      // this.historyPushFlag = true
      this.origin = this.editor.getValue()
      this.html = md.render(this.origin)
    }
    ,
// 校验markdown图片标签
    checkMdImgTag() {
      let str = this.editor.getSelection().trim();
      let result = this.imagePattern.exec(str);
      let linkResult = this.linkImagePattern.exec(str);
      let checkFlag = true;
      if ((result === null || result.length !== 3) && (linkResult === null || linkResult.length !== 3)) {
        checkFlag = false;
      }
      return {
        checkFlag: checkFlag,
        result: result,
        linkResult: linkResult
      }
    }
    ,
    changeImgSize(val) {
      let checkResult = this.checkMdImgTag();
      let result = checkResult.result;
      let linkResult = checkResult.linkResult;
      if (!checkResult.checkFlag) {
        alert("请选择正确的markdown格式图片标签")
      } else if (result != null && result.length === 3) {
        insertImg(this, {url: result[2], title: result[1]}, 'imgTag', val);
      } else if (linkResult != null && linkResult.length === 3) {
        insertImg(this, {url: linkResult[2], title: linkResult[1]}, 'imgTag', val);
      } else {
        alert("请选择正确的markdown格式图片标签")
      }
    }
    ,
    getEditorDom() {
      // 获取 编辑器组件
      return this.$el.querySelector('.CodeMirror');
    }
  }
  ,
  created() {
    this.initLang()
  }
  ,
  mounted() {
    this.initEditor();
    if (JSON.stringify(this.imageUploader) !== "{}") {
      this.config.imageUploader = this.imageUploader
    }
    // 设置主题
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', this.theme)
    }
    // 全屏状态检测
    if (this.fullscreen === true) {
      this.$refs.toolbar.toolbar.fullScreenEditFlag = this.fullscreen;
      this.$refs.toolbar.fullScreenEdit();
    }
  }
}
</script>
