<style lang="css">
@import "./index.css";
@import "../../assets/css/github-markdown.css";
@import url("//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="md-container" :style="fullEditStyle" :class="{'md-shadow':shadow,'md-border':!shadow}">
    <toolbar ref="toolbar"
             :themes="themes"
             @operate="operate"
             @insertImg="insertImg"
             @insertTable="insertTable"
             @preview="preview"
             @fullScreen="fullScreen"
             @fullScreenEdit="fullScreenEdit"
             @setTheme="setTheme"
             :toolbar="toolbar"></toolbar>
    <div class="le-note-container">
      <div class="le-note-left">
        <textarea ref="editor" id="my-textarea"
                  :style="{fontSize:config.font.textArea}"
                  placeholder="输入数据..."></textarea></div>
      <transition name="le-note-right-animation">
        <div class="le-note-right"
             :style="fullStyle"
             v-show="previewFlag">
          <a href="javascript:;"
             v-if="fullScreenFlag"
             @click="fullScreen()">
            <i class="fa fa-window-close-o"></i></a>
          <div class="markdown-body"
               ref="markdownBody"
               :style="{fontSize:config.font.mdBody}"
               v-html="html"></div>
        </div>
      </transition>
    </div>
    <div class="loader-modal" v-if="loaderFlag">
      <div class="loader">
  <!--      <span class="text">上传中</span>-->
        <span class="spinner"></span>
      </div>
    </div>
  </div>
</template>
<script>
import {syncPreview,syncEditor} from '../../lib/core/editor'
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

export const themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn']
themes.forEach((theme) => {
  require(`codemirror/theme/${theme}.css`)
})
import '../../lib/core/editor'
import toolbar from '../toolbar/toolbar.vue'
import { insertImg, insertTable, simpleClick } from '../../lib/core/toolbar_click'
import md from '../../lib/core/markdown'
import config from '../../lib/config'
import { uploadToServer, uploadToGithub } from '../../lib/utils/upload'
import flowchart from 'flowchart.js'
import 'highlight.js/styles/github.css'
export default {
  name: 'le-notes',
  components: {
    toolbar
  },
  props:{
      value:{
        type: String,
        default:""
      },
      font:{
          type: Object,
          default(){
              return config.font
          }
      },
      theme:{
        type: String,
        default:'base16-dark'
      },
      // 工具栏是否显示
      shadow:{
          type: Boolean,
          default:true
      },
      // 工具栏是否显示
      showToolbar:{
          type: Boolean,
          default:true
      },
      // 工具栏内部功能及快捷键
      toolbar:{
          type: Object,
          default(){
              return config.toolbar
          }
      },
      // 图片上传配置
      imageUploader:{
          type: Object,
          default() {
              return {};
          }
      }
  },
  data () {
    return {
      config: config,
      themes: themes,
      fullStyle: "",
      fullEditStyle: "",
      placeholders: '', // 占位符
      previewFlag: true,
      fullScreenFlag: false,
      fullScreenEditFlag: false,
      origin: '',
      html: '',
      // history: [],
      // historyIndex: -1,
      // historyPushFlag: true,
      timer: null,
      files: [],
      editor:null,
      loaderFlag:false
    }
  },
  watch: {
    loaderFlag: function (val) {
      if (val) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('touchmove',(e)=>{
          e.preventDefault();
          e.stopPropagation();
        }, {passive: false})
      } else {
        document.body.style.overflow = ''
        document.addEventListener('touchmove',(e)=>{
          e.preventDefault();
          e.stopPropagation();
        }, {passive: true})
      }
    },
    // origin: function (val) {
    //   clearTimeout(this.timer)
    //   // 不延迟会存下很多没有大多意义的历史记录
    //   if (this.historyPushFlag) {
    //     this.timer = setTimeout(() => {
    //       this.history.splice(++this.historyIndex, 1, val)
    //     }, 200);
    //   }
    //   this.html = md.render(val);
    //   this.historyPushFlag = true
    //   // 流程图 暂时没找到更好的办法 先做个延迟吧
    //   setTimeout(function () {
    //     document.querySelectorAll('.md-flowchart').forEach(element => {
    //       try {
    //         let code = element.textContent
    //         let chart = flowchart.parse(code)
    //         element.textContent = ''
    //         chart.drawSVG(element)
    //       }
    //       catch (e) {
    //         element.outerHTML = `<pre>error: ${e}</pre>`
    //       }
    //     })
    //   }, 100)
    // }
  },
  methods: {
    operate (type) {
      // 点击了工具栏 触发功能
      simpleClick(this, type)
    },
    insertImg (url, title) {
      // 插入图片
      insertImg(this, url, title)
    },
    insertTable (tableInfo) {
      // 添加表格
      insertTable(this, tableInfo);
    },
    preview (flag) {
      // 开关实时预览
      this.previewFlag = flag
      document.getElementsByClassName('le-note-left')[0].style.width = this.previewFlag ? '50%' : '100%'
    },
    fullScreen () {
      this.preview(true)
      // 全屏
      this.fullScreenFlag = !this.fullScreenFlag
      this.fullStyle = this.fullScreenFlag ? {
        width: document.documentElement.clientWidth + 'px',
        height: document.documentElement.clientHeight + 'px',
        top: '0',
        left: '0',
        position: 'fixed',
        'z-index': '500'
      } : "";
    },
    fullScreenEdit () {
      // 全屏
      this.fullScreenEditFlag = !this.fullScreenEditFlag
      this.fullEditStyle = this.fullScreenEditFlag ? {
        width: document.documentElement.clientWidth + 'px',
        height: document.documentElement.clientHeight + 'px',
        top: '0',
        left: '0',
        position: 'fixed',
        'z-index': '500'
      } : "";
    },
    setTheme(theme){
      this.editor.setOption("theme",theme)
    },
    initLang () {
      let lang = config.langList.indexOf(this.language) >= 0 ? this.language : 'zh_CN';
      this.placeholders = config.words[`${lang}`].placeholders
    },
    onDrag: function (e) {
      if(!this.config.dragUpload){
          return
      }
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      let dt = e.dataTransfer;
      this.upload(dt.files[0])
    },
    upload(file){
      let flag = false
      let fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLocaleLowerCase()
      for (let i = 0; i < this.config.imageType.length; i++) {
        if(this.config.imageType[i] === fileType){
          flag = true
          break
        }
      }
      if(!flag) return
      let fileName = this.config.imageUploader.fileNameType === 'uuid' ? (this.generateUUID() + '.' + fileType) : file.name;
      if (this.config.imageUploader.custom) {
        // 自定义
        if(this.config.imageUploader.fileType === 'base64'){
          var reader = new FileReader();
          let that = this
          reader.onload = function (e) {
            that.$emit('uploadImg',that, e.target.result, fileName)
          };
          reader.readAsDataURL(file);
        }else{
          this.$emit('uploadImg',this, file, fileName)
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
    },
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
    },
    setMdValue(){
      // let that = this
      // 这个功能在编辑器中已经有了 所以这里去除
      // clearTimeout(this.timer)
      // // 不延迟会存下很多没有大多意义的历史记录
      // if (this.historyPushFlag) {
      //   this.timer = setTimeout(() => {
      //     that.history.splice(++that.historyIndex, 1, that.origin)
      //   }, 200);
      // }
      // this.historyPushFlag = true
      this.origin = this.editor.getValue()
      this.html = md.render(this.origin);
      // 流程图 暂时没找到更好的办法 先做个延迟吧
      setTimeout(function () {
        document.querySelectorAll('.md-flowchart').forEach(element => {
          try {
            let code = element.textContent
            let chart = flowchart.parse(code)
            element.textContent = ''
            chart.drawSVG(element)
          }
          catch (e) {
            element.outerHTML = `<pre>error: ${e}</pre>`
          }
        })
      }, 100)
    },
    getChildNodes(nodes) {
      let len = nodes.length
      let childNodes = []
      for (let i = 0; i < len; i++) {
        if (nodes[i].nodeName !== "#text") {
          childNodes.push(nodes[i]);
        }
      }
      return childNodes
    }
  },
  created () {
    this.initLang()
  },
  mounted () {
    let that = this
    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      lineNumbers: true,
      mode: 'markdown',
      theme: that.theme,
      lineWrapping: true,
      scrollPastEnd: true,
      autofocus: true,
      styleActiveLine: { nonEmpty: true },
      tabSize: 4,
      indentUnit: 2,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      dragDrop:true,
      matchBrackets:true
    });
    if(that.value !== "") {
      that.editor.setValue(that.value)
      that.setMdValue()
    }
    this.editor.on("change", ()=>{
      that.setMdValue()
    })
    if(JSON.stringify(this.imageUploader ) !== "{}"){
        this.config.imageUploader = this.imageUploader
    }
    this.editor.on('scroll', (instance) => {
      // console.log(document.querySelector('.CodeMirror-code').childNodes)
      // console.log(this.editor.getValue().split('\n').length)
      // console.log(this.getChildNodes(document.querySelector('.CodeMirror-code')))
      // console.log(this.getChildNodes(document.querySelector('.markdown-body')))
      // syncPreview()
    })
    // this.$toast('提示测试...')
    const dropBox = document.querySelector('.CodeMirror');
    dropBox.addEventListener('dragenter', this.onDrag, false);
    dropBox.addEventListener('dragover', this.onDrag, false);
    dropBox.addEventListener('drop', this.onDrop, false);
    // dropBox.addEventListener("paste",function(e){
    //   let cbd = e.clipboardData;
    //   if ( !(e.clipboardData && e.clipboardData.items) ) {
    //     return;
    //   }
    //   for(let i = 0; i < cbd.items.length; i++) {
    //     let item = cbd.items[i];
    //     if(item.kind === "file"){
    //       let file = item.getAsFile();
    //       if (file.size === 0) {
    //         return;
    //       }else{
    //         that.upload(file)
    //       }
    //     }
    //   }
    // });
  }
}
</script>
