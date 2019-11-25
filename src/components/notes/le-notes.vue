<style lang="css">
@import "./index.css";
@import "../../assets/css/github-markdown.css";
@import url("//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="md-container">
    <toolbar class="bar" ref="toolbar"
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
  </div>
</template>
<script>
import toolbar from '../toolbar/toolbar.vue'
import { insertImg, insertTable, simpleClick } from '../../lib/core/toolbar_click'
import md from '../../lib/core/markdown'
import config from '../../lib/config'
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
          console.log(this.history)
        }, 200);
      }
      this.html = md.render(val);
      this.historyPushFlag = true
      // 流程图 暂时没找到更好的办法 先做个延迟吧
      setTimeout(function () {
        document.querySelectorAll('.md-flowchart').forEach(element => {
          try {
            let code = element.textContent
            console.log(element)
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
          that.insertImg('https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png', file.name)
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
    let mdHeight = document.querySelector('.md-container').offsetHeight
    this.toolBarHeight = document.querySelector('.bar').offsetHeight
    console.log('mdHeight' + mdHeight);
    // this.toolBarHeight = document.getElementsByClassName('le-note-toolbar')[0].clientHeight;
    this.containerHeight = (mdHeight || 400) - this.toolBarHeight
    var dropbox = document.querySelector('#my-textarea');
    dropbox.addEventListener('dragenter', this.onDrag, false);
    dropbox.addEventListener('dragover', this.onDrag, false);
    dropbox.addEventListener('drop', this.onDrop, false);
  }
}
</script>
