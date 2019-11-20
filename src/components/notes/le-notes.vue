<style lang="css">
@import "./index.css";
</style>
<style lang="css">
@import "../../assets/css/github-markdown.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="md-comtaniner">
    <toolbar @operate="operate"
             @insertImg="insertImg"
             @insertTable="insertTable"></toolbar>
    <div class="le-note-container">
      <div class="le-note-left">
        <textarea id="my-textarea"
                  :style="{'margin-top':toolBarHeight + 'px'}"
                  v-model="orign"></textarea></div>
      <div class="le-note-right">
        <div class="markdown-body"
             :style="{'padding-top': toolBarHeight + 'px'}"
             v-html="html"></div>
      </div>
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
      toolBarHeight: 35,
      placeholders: '', // 占位符
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
    // 监听 工具栏的高度
    this.toolBarHeight = `${document.getElementsByClassName('le-note-toolbar')[0].offsetHeight}`;
    const that = this;
    window.onresize = function temp () {
      that.toolBarHeight = `${document.getElementsByClassName('le-note-toolbar')[0].offsetHeight}`;
    };

    var dropbox = document.querySelector('#my-textarea');
    dropbox.addEventListener('dragenter', this.onDrag, false);
    dropbox.addEventListener('dragover', this.onDrag, false);
    dropbox.addEventListener('drop', this.onDrop, false);
  }
}
</script>
