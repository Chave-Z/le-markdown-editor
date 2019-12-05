<style lang="css">
@import "./index.css";
</style>
<template>
  <div class="le-editor-toolbar">
    <ul class="le-editor-tools not-select">
      <li v-if="toolbar.undo"><a href="javascript:;"
           title="撤销（Ctrl+Z）"
           unselectable="on"
           @click.stop="toolbarClick('undo')"><i class="fa fa-undo"
             name="undo"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.redo"><a href="
               javascript:;"
           title="重做（Ctrl+Y）"
           unselectable="on"
           @click.stop="toolbarClick('redo')"><i class="fa fa-repeat"
             name="redo"
             unselectable="on"></i></a></li>
      <li v-if="dividers[0]"
          class="divider"
          unselectable="on">|</li>
      <li v-if="toolbar.bold"><a href="javascript:;"
           title="粗体(Ctrl+B)"
           unselectable="on"
           @click.stop="toolbarClick('bold')"><i class="fa fa-bold"
             name="bold"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.del"><a href="javascript:;"
           title="删除线（Ctrl+D）"
           unselectable="on"
           @click.stop="toolbarClick('del')"><i class="fa fa-strikethrough"
             name="del"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.underline"><a href="javascript:;"
           title="下划线（Ctrl+U）"
           unselectable="on"
           @click.stop="toolbarClick('underline')"><i class="fa fa-underline"
             name="underline"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.italic"><a href="javascript:;"
           title="斜体（Ctrl+I）"
           unselectable="on"
           @click.stop="toolbarClick('italic')"><i class="fa fa-italic"
             name="italic"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.quote"><a href="javascript:;"
           title="引用（Ctrl+Q）"
           unselectable="on"
           @click.stop="toolbarClick('quote')"><i class="fa fa-quote-left"
             name="quote"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.bookmark"><a href="javascript:;"
           title="标记（Ctrl+M）"
           unselectable="on"
           @click.stop="toolbarClick('bookmark')"><i class="fa fa-bookmark"
             name="bookmark"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.superscript"><a href="javascript:;"
           title="上角标（Ctrl+Alt+S）"
           unselectable="on"
           @click.stop="toolbarClick('superscript')"><i class="fa fa-superscript"
             name="superscript"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.subscript"><a href="javascript:;"
           title="下角标（Ctrl+Alt+B）"
           unselectable="on"
           @click.stop="toolbarClick('subscript')"><i class="fa fa-subscript"
             name="subscript"
             unselectable="on"></i></a></li>
      <li class="divider"
          unselectable="on" v-if="dividers[0]">|</li>
      <li v-if="toolbar.h1"><a href="javascript:;"
           title="标题1（Ctrl+1）"
           unselectable="on"
           @click.stop="toolbarClick('h1')"><i class="fa tools-bold"
             name="h1"
             unselectable="on">H1</i></a></li>
      <li v-if="toolbar.h2"><a href="javascript:;"
           title="标题2（Ctrl+2）"
           unselectable="on"
           @click.stop="toolbarClick('h2')"><i class="fa tools-bold"
             name="h2"
             unselectable="on">H2</i></a></li>
      <li v-if="toolbar.h3"><a href="javascript:;"
           title="标题3（Ctrl+3）"
           unselectable="on"
           @click.stop="toolbarClick('h3')"><i class="fa tools-bold"
             name="h3"
             unselectable="on">H3</i></a></li>
      <li v-if="toolbar.h4"><a href="javascript:;"
           title="标题4（Ctrl+4）"
           unselectable="on"
           @click.stop="toolbarClick('h4')"><i class="fa tools-bold"
             name="h4"
             unselectable="on">H4</i></a></li>
      <li v-if="toolbar.h5"><a href="javascript:;"
           title="标题5（Ctrl+5）"
           unselectable="on"
           @click.stop="toolbarClick('h5')"><i class="fa tools-bold"
             name="h5"
             unselectable="on">H5</i></a></li>
      <li v-if="toolbar.h6"><a href="javascript:;"
           title="标题6（Ctrl+6）"
           unselectable="on"
           @click.stop="toolbarClick('h6')"><i class="fa tools-bold"
             name="h6"
             unselectable="on">H6</i></a></li>
      <li class="divider"
          unselectable="on" v-if="dividers[1]">|</li>
      <li v-if="toolbar.alignLeft"><a href="javascript:;"
           title="居左（Ctrl+Alt+L）"
           unselectable="on"
           @click.stop="toolbarClick('align-left')"><i class="fa fa-align-left"
             name="align-left"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.alignCenter"><a href="javascript:;"
           title="居中（Ctrl+Alt+C）"
           unselectable="on"
           @click.stop="toolbarClick('align-center')"><i class="fa fa-align-center"
             name="align-center"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.alignRight"><a href="javascript:;"
           title="居右（Ctrl+Alt+R）"
           unselectable="on"
           @click.stop="toolbarClick('align-right')"><i class="fa fa-align-right"
             name="align-right"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.ol"><a href="javascript:;"
           title="有序列表（Ctrl+Alt+O）"
           unselectable="on"
           @click.stop="toolbarClick('ol')"><i class="fa fa-list-ol"
             name="list-ol"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.ul"><a href="javascript:;"
           title="无序列表（Ctrl+Alt+U）"
           unselectable="on"
           @click.stop="toolbarClick('ul')"><i class="fa fa-list-ul"
             name="list-ul"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.hr"><a href="javascript:;"
           title="分割线（Ctrl+Alt+H）"
           unselectable="on"
           @click.stop="toolbarClick('hr')"><i class="fa fa-minus"
             name="hr"
             unselectable="on"></i></a></li>
      <li class="divider"
          unselectable="on" v-if="dividers[2]">|</li>
      <li v-if="toolbar.link"><a href="javascript:;"
           title="链接（Ctrl+L）"
           unselectable="on"
           @click.stop="toolbarClick('link')"><i class="fa fa-link"
             name="link"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.inlineCode"><a href="javascript:;"
           title="行内代码（Ctrl+Alt+I）"
           unselectable="on"
           @click.stop="toolbarClick('inlineCode')"><i class="fa fa-code"
             name="code"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.code"><a href="javascript:;"
           title="代码块（Ctrl+Alt+D）"
           unselectable="on"
           @click.stop="toolbarClick('code')"><i class="fa fa-file-code-o"
             name="preformatted-text"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.image"><a href="javascript:;"
           title="添加图片"
           unselectable="on"
           @click.stop="insertImgFlag = true"><i class="fa fa-picture-o"
             name="image"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.table"><a href="javascript:;"
           title="添加表格"
           unselectable="on"><i class="fa fa-table"
             name="table"
             unselectable="on"
             @click.stop="insertTableFlag = true"></i></a></li>
      <li v-if="toolbar.time"><a href="javascript:;"
           title="日期时间"
           unselectable="on"><i class="fa fa-clock-o"
             name="datetime"
             unselectable="on"></i></a></li>
      <li class="divider"
          unselectable="on" v-if="dividers[3]">|</li>
      <li v-if="toolbar.preview"><a href="javascript:;"
           :title="previewFlag ? '关闭实时预览（Ctrl+Alt+P）' : '打开实时预览（Ctrl+Alt+P）'"
           unselectable="on"
           @click.stop="preview()">
          <i :class="{'fa fa-eye-slash':previewFlag,
             'fa fa-eye':!previewFlag}"
             name="preview"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.fullScreenEdit"><a href="javascript:;"
           :title="fullScreenEditFlag ? '打开全屏编辑（Ctrl+Alt+E' : '关闭实时预览（Ctrl+Alt+E）'"
           unselectable="on"
           @click.stop="fullScreenEdit()">
          <i :class="{'fa fa-arrows-alt':fullScreenEditFlag,
             'fa fa-compress':!fullScreenEditFlag}"
             name="fullScreenEdit"
             unselectable="on"></i></a></li>
      <li v-if="toolbar.fullScreen"><a href="javascript:;"
           title="全窗口预览（Ctrl+Alt+F）"
           unselectable="on"><i class="fa fa-desktop"
             name="fullScreen"
             unselectable="on"
             @click.stop="fullScreen()"></i></a></li>
<!--      <li v-if="toolbar.clear"><a href="javascript:;"-->
<!--           title="清空"-->
<!--           unselectable="on"><i class="fa fa-eraser"-->
<!--             name="clear"-->
<!--             unselectable="on"></i></a></li>-->
      <li v-if="toolbar.skin" class="skin"><a href="javascript:;"
           title="皮肤"
           unselectable="on"><i class="fa fa-magic"
            name="skin"
            unselectable="on"
            @click.stop="skinFlag = true"></i></a>
        <div class="dropdown-content" v-if="skinFlag">
          <a v-for="(item,index) in themes" v-bind:key="index" v-text="item" @click="selectTheme(item)"></a>
        </div>
      </li>
      <li v-if="toolbar.save"><a href="javascript:;"
           title="保存"
           unselectable="on"><i class="fa fa-save"
            name="save"
            unselectable="on"
            @click.stop="save()"></i></a></li>
<!--      <li v-if="toolbar.download"><a href="javascript:;"-->
<!--           title="下载"-->
<!--           unselectable="on"><i class="fa fa-download"-->
<!--             name="download"-->
<!--             unselectable="on"></i></a></li>-->
    </ul>
    <!-- 添加网络图片 -->
    <transition name="slide-fade">
      <div class="modal"
           v-if="insertImgFlag"
           @touchmove.prevent.stop
           @mousewheel.prevent>
        <div class="dropbox image-box">
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
      </div>
    </transition>
    <!-- 添加表格 -->
    <transition name="slide-fade">
      <div class="modal"
           v-if="insertTableFlag"
           @touchmove.prevent.stop
           @mousewheel.prevent>
        <div class="dropbox table-box">
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
      </div>
    </transition>
  </div>
</template>
<script>
import { keydownListener } from '../../lib/core/keydown-listener'

export default {
  name: 'le-toolbar',
  props: ['toolbar','themes'],
  data () {
    return {
      modalStyle: {},
      insertImgFlag: false,
      insertTableFlag: false,
      imageInfo: {
        title: '',
        url: 'http://'
      },
      tableInfo: {
        rows: 3,
        cols: 2,
        type: 'justify'
      },
      previewFlag: true,
      fullScreenEditFlag: true,
      skinFlag: false,
      dividers:[false,false,false,false]
    }
  },
  watch: {
    insertImgFlag: function (val) {
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
    insertTableFlag: function (val) {
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
    }
  },
  methods: {
    toolbarClick (type) {
        if(this.toolbar[`${type}`]){
            this.$emit('operate', type)
        }
    },
    insertImg () {
        if(this.toolbar.image) {
            this.$emit('insertImg', this.imageInfo.url, this.imageInfo.title)
            this.insertImgFlag = false
        }
    },
    insertTable () {
        if(this.toolbar.table) {
            this.$emit('insertTable', this.tableInfo)
            this.insertTableFlag = false
        }
    },
    preview () {
        if(this.toolbar.preview) {
            this.previewFlag = !this.previewFlag
            this.$emit('preview', this.previewFlag)
        }
    },
    fullScreen () {
        if(this.toolbar.fullScreen) {
            // 全屏
            this.$emit('fullScreen')
        }
    },
    fullScreenEdit () {
        if(this.toolbar.fullScreenEdit) {
            // 全屏编辑
            this.fullScreenEditFlag = !this.fullScreenEditFlag
            this.$emit('fullScreenEdit')
        }
    },
    save(){
        if(this.toolbar.save) {
            // 保存
            this.$emit('save')
        }
    },
    selectTheme(theme){
      this.skinFlag = false
      this.$emit('setTheme',theme)
    },
    checkArea(toolNames,index){
      toolNames.some((item)=>{
        if (this.toolbar[`${item}`]) {
          this.dividers[index] = true
          return true
        }
      })
    }
  },
  created(){
    this.checkArea(['h1','h2','h3','h4','h5','h6'],0);
    this.checkArea(['alignLeft','alignCenter','alignRight','ol','ul','hr'],1);
    this.checkArea(['link','inlineCode','code','image','table'],2);
    this.checkArea(['fullScreen','preview','fullScreenEdit','skin','download'],3);
  },
  mounted () {
    keydownListener(this)
  }
}
</script>
