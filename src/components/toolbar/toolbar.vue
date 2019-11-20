<style lang="css">
@import "./index.css";
</style>
<template>
  <div class="le-note-toolbar">
    <ul class="le-note-tools">
      <li><a href="javascript:;"
           title="撤销（Ctrl+Z）"
           unselectable="on"
           @click="toolbarClick('undo')"><i class="fa fa-undo"
             name="undo"
             unselectable="on"></i></a></li>
      <li><a href="
               javascript:;"
           title="重做（Ctrl+Y）"
           unselectable="on"
           @click="toolbarClick('redo')"><i class="fa fa-repeat"
             name="redo"
             unselectable="on"></i></a></li>
      <li class="divider"
          unselectable="on">|</li>
      <li><a href="javascript:;"
           title="粗体(Ctrl+B)"
           unselectable="on"
           @click="toolbarClick('bold')"><i class="fa fa-bold"
             name="bold"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="删除线"
           unselectable="on"
           @click="toolbarClick('del')"><i class="fa fa-strikethrough"
             name="del"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="下划线"
           unselectable="on"
           @click="toolbarClick('underline')"><i class="fa fa-underline"
             name="underline"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="斜体"
           unselectable="on"
           @click="toolbarClick('italic')"><i class="fa fa-italic"
             name="italic"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="引用"
           unselectable="on"
           @click="toolbarClick('quote')"><i class="fa fa-quote-left"
             name="quote"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="标记"
           unselectable="on"
           @click="toolbarClick('bookmark')"><i class="fa fa-bookmark"
             name="bookmark"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="上角标"
           unselectable="on"
           @click="toolbarClick('superscript')"><i class="fa fa-superscript"
             name="superscript"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="下角标"
           unselectable="on"
           @click="toolbarClick('subscript')"><i class="fa fa-subscript"
             name="subscript"
             unselectable="on"></i></a></li>
      <!-- <li><a href="javascript:;"
             title="将每个单词首字母转成大写"
             unselectable="on"><i class="fa"
               name="ucwords"
               style="font-size:20px;margin-top: -3px;">Aa</i></a></li>
        <li><a href="javascript:;"
             title="将所选转换成大写"
             unselectable="on"><i class="fa fa-font"
               name="uppercase"
               unselectable="on"></i></a></li>
        <li><a href="javascript:;"
             title="将所选转换成小写"
             unselectable="on"><i class="fa"
               name="lowercase"
               style="font-size:24px;margin-top: -10px;">a</i></a></li> -->
      <li class="divider"
          unselectable="on">|</li>
      <li><a href="javascript:;"
           title="标题1"
           unselectable="on"
           @click="toolbarClick('h1')"><i class="fa tools-bold"
             name="h1"
             unselectable="on">H1</i></a></li>
      <li><a href="javascript:;"
           title="标题2"
           unselectable="on"
           @click="toolbarClick('h2')"><i class="fa tools-bold"
             name="h2"
             unselectable="on">H2</i></a></li>
      <li><a href="javascript:;"
           title="标题3"
           unselectable="on"
           @click="toolbarClick('h3')"><i class="fa tools-bold"
             name="h3"
             unselectable="on">H3</i></a></li>
      <li><a href="javascript:;"
           title="标题4"
           unselectable="on"
           @click="toolbarClick('h4')"><i class="fa tools-bold"
             name="h4"
             unselectable="on">H4</i></a></li>
      <li><a href="javascript:;"
           title="标题5"
           unselectable="on"
           @click="toolbarClick('h5')"><i class="fa tools-bold"
             name="h5"
             unselectable="on">H5</i></a></li>
      <li><a href="javascript:;"
           title="标题6"
           unselectable="on"
           @click="toolbarClick('h6')"><i class="fa tools-bold"
             name="h6"
             unselectable="on">H6</i></a></li>
      <li class="divider"
          unselectable="on">|</li>
      <li><a href="javascript:;"
           title="居左"
           unselectable="on"
           @click="toolbarClick('align-left')"><i class="fa fa-align-left"
             name="align-left"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="居中"
           unselectable="on"
           @click="toolbarClick('align-center')"><i class="fa fa-align-center"
             name="align-center"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="居右"
           unselectable="on"
           @click="toolbarClick('align-right')"><i class="fa fa-align-right"
             name="align-right"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="有序列表"
           unselectable="on"
           @click="toolbarClick('ol')"><i class="fa fa-list-ol"
             name="list-ol"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="无序列表"
           unselectable="on"
           @click="toolbarClick('ul')"><i class="fa fa-list-ul"
             name="list-ul"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="横线"
           unselectable="on"
           @click="toolbarClick('hr')"><i class="fa fa-minus"
             name="hr"
             unselectable="on"></i></a></li>
      <li class="divider"
          unselectable="on">|</li>
      <li><a href="javascript:;"
           title="链接"
           unselectable="on"
           @click="toolbarClick('link')"><i class="fa fa-link"
             name="link"
             unselectable="on"></i></a></li>
      <!-- <li><a href="javascript:;"
             title="引用链接"
             unselectable="on"><i class="fa fa-anchor"
               name="reference-link"
               unselectable="on"></i></a></li> -->
      <li><a href="javascript:;"
           title="添加图片"
           unselectable="on"
           @click="insertImgFlag = true"><i class="fa fa-picture-o"
             name="image"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="行内代码"
           unselectable="on"
           @click="toolbarClick('inlineCode')"><i class="fa fa-code"
             name="code"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="预格式文本 / 代码块（缩进风格）"
           unselectable="on"
           @click="toolbarClick('code')"><i class="fa fa-file-code-o"
             name="preformatted-text"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="添加表格"
           unselectable="on"><i class="fa fa-table"
             name="table"
             unselectable="on"
             @click="insertTableFlag = true"></i></a></li>
      <li><a href="javascript:;"
           title="日期时间"
           unselectable="on"><i class="fa fa-clock-o"
             name="datetime"
             unselectable="on"></i></a></li>
      <!-- <li><a href="javascript:;"
           title="Emoji表情"
           unselectable="on"><i class="fa fa-smile-o"
             name="emoji"
             unselectable="on"></i></a></li> -->
      <!-- <li><a href="javascript:;"
           title="HTML实体字符"
           unselectable="on"><i class="fa fa-copyright"
             name="html-entities"
             unselectable="on"></i></a></li> -->
      <!-- <li><a href="javascript:;"
           title="插入分页符"
           unselectable="on"><i class="fa fa-newspaper-o"
             name="pagebreak"
             unselectable="on"></i></a></li> -->
      <li class="divider"
          unselectable="on">|</li>
      <!-- <li><a href="javascript:;"
           title="跳转到行"
           unselectable="on"><i class="fa fa-terminal"
             name="goto-line"
             unselectable="on"></i></a></li> -->
      <li><a href="javascript:;"
           title="关闭实时预览"
           unselectable="on"><i class="fa fa-eye-slash"
             name="watch"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="全窗口预览HTML（按 Shift + ESC还原）"
           unselectable="on"><i class="fa fa-desktop"
             name="preview"
             unselectable="on"></i></a></li>
      <li><a href="javascript:;"
           title="清空"
           unselectable="on"><i class="fa fa-eraser"
             name="clear"
             unselectable="on"></i></a></li>
      <!-- <li><a href="javascript:;"
             title="搜索"
             unselectable="on"><i class="fa fa-search"
               name="search"
               unselectable="on"></i></a></li> -->
      <li class="divider"
          unselectable="on">|</li>
      <li><a href="javascript:;"
           title=""
           unselectable="on"><i class="fa fa-download"
             name="download"
             unselectable="on"></i></a></li>
    </ul>
    <!-- 添加网络图片 -->
    <transition name="slide-fade">
      <div class="dropbox p-3"
           v-if="insertImgFlag">
        <div class="dialog-header"
             style="cursor: move;"><strong class="dialog-title">添加图片</strong>
        </div>
        <a href="javascript:;"
           class="fa fa-close dialog-close"
           @click="insertImgFlag = false"></a>
        <div class="dialog-container">
          <div class="dialog-form">
            <label>图片描述</label><input type="text"
                   v-model="imageInfo.title"
                   data-alt="">
            <br><br>
            <label>图片链接</label><input type="text"
                   v-model="imageInfo.url"
                   data-link="">
          </div>
          <div class="dialog-footer">
            <button class="dialog-btn dialog-enter-btn"
                    @click="insertImg()">确定</button>
            <button class="dialog-btn dialog-cancel-btn"
                    @click="insertImgFlag = false">取消</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 添加表格 -->
    <transition name="slide-fade">
      <div class="dropbox p-3"
           v-if="insertTableFlag">
        <div class="dialog-header"
             style="cursor: move;"><strong class="dialog-title">添加图片</strong>
        </div>
        <a href="javascript:;"
           class="fa fa-close dialog-close"
           @click="insertTableFlag = false"></a>
        <div class="dialog-container">
          <div class="dialog-form"
               style="padding: 13px 0;">
            <label>单元格数</label>
            行数 <input type="number"
                   v-model="tableInfo.rows"
                   class="number-input"
                   style="width:40px;"
                   max="100"
                   min="2"
                   data-rows="">&nbsp;&nbsp;
            列数 <input type="number"
                   v-model="tableInfo.cols"
                   class="number-input"
                   style="width:40px;"
                   max="100"
                   min="1"
                   data-cols=""><br><br>
            <label>对齐方式</label>
            <div class="fa-btns">
              <a href="javascript:;">
                <label title="默认">
                  <input type="radio"
                         v-model="tableInfo.type"
                         name="table-align"
                         value="justify"
                         checked="checked">&nbsp;<i class="fa fa-align-justify">
                  </i>
                </label>
              </a>
              <a href="javascript:;">
                <label title="左对齐">
                  <input type="radio"
                         v-model="tableInfo.type"
                         name="table-align"
                         value="left">&nbsp;<i class="fa fa-align-left">
                  </i>
                </label>
              </a>
              <a href="javascript:;">
                <label title="居中对齐">
                  <input type="radio"
                         v-model="tableInfo.type"
                         name="table-align"
                         value="center">&nbsp;<i class="fa fa-align-center">
                  </i>
                </label>
              </a><a href="javascript:;">
                <label title="右对齐">
                  <input type="radio"
                         v-model="tableInfo.type"
                         name="table-align"
                         value="right">&nbsp;<i class="fa fa-align-right">
                  </i>
                </label>
              </a>
            </div>
          </div>
          <div class="dialog-footer">
            <button class="dialog-btn dialog-enter-btn"
                    @click="insertTable()">确定</button>
            <button class="dialog-btn dialog-cancel-btn"
                    @click="insertTableFlag = false">取消</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  name: 'le-toolbar',
  data () {
    return {
      insertImgFlag: false,
      insertTableFlag: true,
      imageInfo: {
        title: '',
        url: 'http://'
      },
      tableInfo: {
        rows: 3,
        cols: 2,
        type: 'justify'
      }
    }
  },
  methods: {
    toolbarClick (type) {
      this.$emit('operate', type)
    },
    insertImg () {
      this.$emit('insertImg', this.imageInfo.url, this.imageInfo.title)
      this.insertImgFlag = false
    },
    insertTable () {
      this.$emit('insertTable', this.tableInfo)
      this.insertTableFlag = false
    }
  },
  mounted () {
  },
  created () {
    // const KEY_CODE = {
    //   F8: 119,
    //   F9: 120,
    //   F10: 121,
    //   F11: 122,
    //   F12: 123,
    //   B: 66,
    //   I: 73,
    //   H: 72,
    //   U: 85,
    //   D: 68,
    //   M: 77,
    //   Q: 81,
    //   O: 79,
    //   L: 76,
    //   S: 83,
    //   Z: 90,
    //   Y: 89,
    //   C: 67,
    //   T: 84,
    //   R: 82,
    //   DELETE: 8,
    //   TAB: 9,
    //   ENTER: 13,
    //   ONE: 97,
    //   TWO: 98,
    //   THREE: 99,
    //   FOUR: 100,
    //   FIVE: 101,
    //   SIX: 102,
    //   _ONE: 49,
    //   _TWO: 50,
    //   _THREE: 51,
    //   _FOUR: 52,
    //   _FIVE: 53,
    //   _SIX: 54
    // };
    // console.log(this)
    // console.log(this.el)
    // this.$el.addEventListener('keydown', (e) => {
    //   // console.log(e)
    //   if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey) {
    //     // console.log(e)
    //     // ctrl +
    //     // e.preventDefault()
    //     switch (e.keyCode) {
    //       case KEY_CODE.B: {
    //         // B
    //         // $vm.toolbar_left_click
    //         console.log('bold')
    //         break;
    //       }
    //       case KEY_CODE.I: {
    //         // I
    //         e.preventDefault()
    //         console.log('italic')
    //         break;
    //       }
    //       case KEY_CODE.U: {
    //         // U
    //         e.preventDefault()
    //         console.log('underline')
    //         break;
    //       }
    //       case KEY_CODE.D: {
    //         // D
    //         e.preventDefault()
    //         console.log('removeLine')
    //         break;
    //       }
    //       case KEY_CODE.M: {
    //         // M
    //         e.preventDefault()
    //         console.log('mark')
    //         break;
    //       }
    //       case KEY_CODE.Q: {
    //         // Q
    //         e.preventDefault()
    //         console.log('quote')
    //         break;
    //       }
    //       case KEY_CODE.O: {
    //         // O
    //         e.preventDefault()
    //         console.log('ol')
    //         break;
    //       }
    //       case KEY_CODE.L: {
    //         // L
    //         e.preventDefault()
    //         console.log('link')
    //         break;
    //       }
    //       case KEY_CODE.S: {
    //         // S
    //         e.preventDefault()
    //         console.log('save')
    //         break;
    //       }
    //       case KEY_CODE.Z: {
    //         // Z
    //         e.preventDefault()
    //         console.log('undo')
    //         break;
    //       }
    //       case KEY_CODE.Y: {
    //         // Y
    //         e.preventDefault()
    //         console.log('redo')
    //         break;
    //       }
    //       case KEY_CODE.DELETE: {
    //         // delete
    //         e.preventDefault()
    //         console.log('trash')
    //         break;
    //       }
    //       case KEY_CODE.ONE: {
    //         // ONE
    //         e.preventDefault()
    //         console.log('header1')
    //         break;
    //       }
    //       case KEY_CODE.TWO: {
    //         // TWO
    //         e.preventDefault()
    //         console.log('header2')
    //         break;
    //       }
    //       case KEY_CODE.THREE: {
    //         // THREE
    //         e.preventDefault()
    //         console.log('header3')
    //         break;
    //       }
    //       case KEY_CODE.FOUR: {
    //         // FOUR
    //         e.preventDefault()
    //         console.log('header4')
    //         break;
    //       }
    //       case KEY_CODE.FIVE: {
    //         // FIVE
    //         e.preventDefault()
    //         console.log('header5')
    //         break;
    //       }
    //       case KEY_CODE.SIX: {
    //         // SIX
    //         e.preventDefault()
    //         console.log('header6')
    //         break;
    //       }
    //       case KEY_CODE._ONE: {
    //         // ONE
    //         e.preventDefault()
    //         console.log('header1')
    //         break;
    //       }
    //       case KEY_CODE._TWO: {
    //         // TWO
    //         e.preventDefault()
    //         console.log('header2')
    //         break;
    //       }
    //       case KEY_CODE._THREE: {
    //         // THREE
    //         e.preventDefault()
    //         console.log('header3')
    //         break;
    //       }
    //       case KEY_CODE._FOUR: {
    //         // FOUR
    //         e.preventDefault()
    //         console.log('header4')
    //         break;
    //       }
    //       case KEY_CODE._FIVE: {
    //         // FIVE
    //         e.preventDefault()
    //         console.log('header5')
    //         break;
    //       }
    //       case KEY_CODE._SIX: {
    //         // SIX
    //         e.preventDefault()
    //         console.log('header6')
    //         break;
    //       }
    //     }
    //   }
    // })
  }
}
</script>
