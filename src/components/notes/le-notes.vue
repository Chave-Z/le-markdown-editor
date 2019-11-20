<style lang="css">
@import "./index.css";
</style>
<style lang="css">
@import "../../assets/css/github-markdown.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="md-comtaniner">
    <toolbar ref="toolbar"
             @operate="operate"
             @insertImg="insertImg"
             @insertTable="insertTable"
             @preview="preview"
             @fullScreen="fullScreen"></toolbar>
    <div class="le-note-container"
         :style="{height:containerHeight + 'px','margin-top':toolBarHeight + 'px'}">
      <div class="le-note-left">
        <textarea id="my-textarea"
                  v-model="orign"
                  :style="{fontSize:config.font.textArea}"
                  placeholder="Coding now..."></textarea></div>
      <transition name="le-note-right-animation">
        <div class="le-note-right"
             v-show="previewFlag">
          <div class="markdown-body"
               :style="{fontSize:config.font.mdBody}"
               v-html="html"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import toolbar from '../toolbar/toolbar.vue'
import { insertImg, insertTable, simpleClick } from '../../lib/core/toolbar_click'
import md from '../../lib/core/markdown'
import config from '../../lib/config'
import 'highlight.js/styles/github.css'
export default {
  name: 'le-notes',
  components: {
    toolbar
  },
  data () {
    return {
      mdSize: {
        width: '1000px',
        height: '400px'
      },
      config: config,
      toolBarHeight: 38,
      containerHeight: 365,
      placeholders: '', // 占位符
      previewFlag: true,
      orign: '',
      html: '',
      history: [''],
      historyIndex: -1,
      historyPushFlag: true,
      timer: null,
      files: []
    }
  },
  watch: {
    orign: function (val) {
      // console.log(this.history)
      // console.log("存储时：------> " + "val=" + val + '    this.historyIndex=' + (this.historyIndex))
      // if (typeof this.history[this.historyIndex] === 'undefined' || this.history[this.historyIndex] !== this.val) {
      //   console.log('-------------------')
      //   clearTimeout(this.timer)
      //   // 不延迟会存下很多没有大多意义的历史记录
      //   this.timer = setTimeout(() => {
      //     this.history.splice(this.historyIndex === 0 ? ++this.historyIndex : this.historyIndex++, 1, val)
      //     console.log(this.history)
      //   }, 10);
      // }
      this.html = md.render(val);
    }
    // ,toolBarHeight: function () {
    // this.$nextTick(() => {
    //   this.toolBarHeight = document.getElementsByClassName('le-note-toolbar')[0].clientHeight;
    //   console.log(this.toolBarHeight)
    // })
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
      // 全屏 待添加
    },
    initLang () {
      let lang = config.langList.indexOf(this.language) >= 0 ? this.language : 'zh_CN';
      this.placeholders = config.words[`${lang}`].placeholders
    },
    uploadFile: function (file) {
      let that = this;
      var item = {
        name: file.name,
        uploadPercentage: 0
      };
      that.files.push(item);
      var fd = new FormData();
      fd.append('file', file);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost/upload', true);
      xhr.upload.addEventListener('progress', function (e) {
        item.uploadPercentage = Math.round((e.loaded * 100) / e.total);
      }, false);
      xhr.send(fd);
      //ajax返回
      xhr.onreadystatechange = function () { //第四步
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
          that.insertImg('https://www.mdeditor.com/images/logos/markdown.png', file.name)
        }
      };
    },
    onDrag: function (e) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var dt = e.dataTransfer;
      for (var i = 0; i !== dt.files.length; i++) {
        this.uploadFile(dt.files[i]);
      }
    }
  },
  created () {
    this.initLang()
  },
  mounted () {
    // 监听 工具栏的高度 有问题 待修改
    let mdHeight = document.getElementsByClassName('md-comtaniner')[0].offsetHeight
    // this.toolBarHeight = document.getElementsByClassName('le-note-toolbar')[0].clientHeight;
    this.containerHeight = (mdHeight || 400) - this.toolBarHeight
    var dropbox = document.querySelector('#my-textarea');
    dropbox.addEventListener('dragenter', this.onDrag, false);
    dropbox.addEventListener('dragover', this.onDrag, false);
    dropbox.addEventListener('drop', this.onDrop, false);
  }
}
</script>
