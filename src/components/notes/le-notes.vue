<style lang="css">
@import "./index.css";
@import "../../assets/css/github-markdown.css";
@import url("//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="md-container" :class="{'shadow':config.shadow}">
    <toolbar class="bar"
             ref="toolbar"
             @operate="operate"
             @insertImg="insertImg"
             @insertTable="insertTable"
             @preview="preview"
             @fullScreen="fullScreen"
             :toolbars="config.toolbars"></toolbar>
    <div class="le-note-container"
         :style="{height:containerHeight + 'px','margin-top':toolBarHeight + 'px'}">
      <div class="le-note-left">
        <textarea id="my-textarea"
                  v-model="orign"
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
               :style="{fontSize:config.font.mdBody}"
               v-html="html"></div>
        </div>
      </transition>
    </div>
    <div class="loader" v-if="false">
<!--      <span class="text">上传中</span>-->
      <span class="spinner"></span>
    </div>
  </div>
</template>
<script>
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
  data () {
    return {
      config: config,
      mdSize: {
        width: '1000px',
        height: '400px'
      },
      fullStyle: "",
      toolBarHeight: 38,
      containerHeight: 365,
      placeholders: '', // 占位符
      previewFlag: true,
      fullScreenFlag: false,
      orign: '',
      html: '',
      history: [],
      historyIndex: -1,
      historyPushFlag: true,
      timer: null,
      files: []
    }
  },
  watch: {
    orign: function (val) {
      clearTimeout(this.timer)
      // 不延迟会存下很多没有大多意义的历史记录
      if (this.historyPushFlag) {
        this.timer = setTimeout(() => {
          this.history.splice(++this.historyIndex, 1, val)
        }, 200);
      }
      this.html = md.render(val);
      this.historyPushFlag = true
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
    }
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
    initLang () {
      let lang = config.langList.indexOf(this.language) >= 0 ? this.language : 'zh_CN';
      this.placeholders = config.words[`${lang}`].placeholders
    },
    onDrag: function (e) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.config.imageUploader.custom) {
        // 自定义
      } else {
        let dt = e.dataTransfer;
        let fileName = this.config.imageUploader.fileNameType === 'uuid' ? (this.generateUUID() + dt.files[0].name.substring(dt.files[0].name.lastIndexOf('.'))) : dt.files[0].name;
        if (this.config.imageUploader.type === 'server') {
          uploadToServer(this, dt.files[0], fileName);
          // for (var i = 0; i !== dt.files.length; i++) {
          //   this.uploadFile(dt.files[0]);
          // }
        } else if (this.config.imageUploader.type === 'github') {
          console.log(this.config.imageUploader.type);
          var reader = new FileReader();
          let that = this
          reader.onload = function (e) {
            uploadToGithub(that, e.target.result, fileName)
          };
          reader.readAsDataURL(dt.files[0]);
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
    }
  },
  created () {
    this.initLang()
  },
  mounted () {
    // this.$toast('提示测试...')
    // 监听 工具栏的高度
      let that = this
    setTimeout(()=>{
        let mdHeight = document.querySelector('.md-container').offsetHeight
        that.toolBarHeight = document.querySelector('.bar').offsetHeight
        console.log(this.toolBarHeight)
        that.containerHeight = (mdHeight || 400) - that.toolBarHeight
    },300)
    const dropBox = document.querySelector('#my-textarea');
    dropBox.addEventListener('dragenter', this.onDrag, false);
    dropBox.addEventListener('dragover', this.onDrag, false);
    dropBox.addEventListener('drop', this.onDrop, false);
  }
}
</script>
