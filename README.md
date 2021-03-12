## le-markdown-editor

> 一款基于vue的Markdown编辑器，功能正在更新中，欢迎反馈，建议使用最新版本，当前最新版本号：1.1.4

功能相关问题反馈或建议可以提交issues或者发邮件到chave_z@163.com，也可以留联系方式，我加你（注明问题或建议）。

编辑器演示地址：http://106.54.92.121/

预览组件演示地址：http://106.54.92.121/preview.html

### 预览图
#### le-editor
![预览图](https://cdn.jsdelivr.net/gh/Chave-Z/picture/1b010cd6c7004529bfa856b3f5ff6a67.png)

![预览图](https://cdn.jsdelivr.net/gh/Chave-Z/picture/c0a3310b084d401a94ed95bc4c45969b.gif)

[更多预览图](doc/cn/preview.md)

### 特性

- 导航
- 标题
- 文字效果
- 引用
- 脚注
- 上角标、下角标
- 有序列表、无序列表、任务清单
- 代码缩进、代码高亮
- 图片上传
- html内嵌(视频、音频等)
- Emoji 表情
- LaTeX 公式
- 流程图
- 大图查看
- 样式替换
- 编辑器内容折叠
- 编辑器换肤功能
- 滚动条同步
- ...

### 更新

> 更多内容请访问[更新记录](doc/cn/change.md)或本项目的change.md文件
- 2021-03-12 v1.1.4
  增加indent-unit属性，可以设置编辑器缩进大小，默认为两个空格
  修复shift+tab回缩进功能失效的问题

- 2020-12-28  v1.1.3
  增加选中markdown图片标签时的快捷修改图片大小的功能: [效果图参考查看](https://cdn.jsdelivr.net/gh/Chave-Z/picture@master/data/image%20(1).gif)

  增加编辑器是否默认全屏属性：fullscreen（ 默认false）

- 2020-04-15  v1.1.2
  修复全屏预览透底问题

  增加皮肤选择再点击关闭选择框的功能

- 2020-04-10 version >= v1.1.1

  新增`le-preview`组件，新增`:hljs-css`属性，可修改代码高亮样式，具体用法请参考readme


###  快速上手
#### 使用cdn
有的人可能不太喜欢用webpack或者就是写个小demo，用不到webpack
编辑器组件参考：[这个文件](./src/dev/notes.html)
预览组件参考：[这个文件](./src/dev/preview.html)

#### 在webpack构建的项目中
- 下载插件

```shell
$ npm i le-markdown-editor --save
```

- `index.js` 或 `main.js` 中

```javascript
import Vue from 'vue'
import leMarkdownEditor from 'le-markdown-editor'
// ...

Vue.use(leMarkdownEditor)
// ....
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
```
- `xxx.vue` (le-editor使用)

```vue
<div id="app">
  <div id="editor-main">
        <le-editor v-model="value" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>
  </div>
</div>

<script>
  export default {
    // ...
    data() {
      return {
        hljsCss: 'agate',
        value: '这里放markdown内容',
        // 自定义
        imageUploader: {
          custom: false,
          fileType: 'file',
          fileNameType: '',
          imagePrefix: 'http://106.54.92.121', // 图片上传成功后，预览地址前缀
          type: 'server',
          url: 'http://106.54.92.121:82/upload' // 上传接口地址
        }
      }
    },
    methods: {
      // 自定义图片上传
      // uploadImg: function ($vm, file, fileName) {
      //   console.log($vm)
      //   console.log(file)
      //   console.log(fileName)
      //   // 添加图片
      //   // 两个参数 第一个是图片访问路径 第二个是文件名
      //   $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${fileName}`, fileName)
      // },
      save: function (val) {
        // 获取预览文本
        console.log(this.value) // 这里是原markdown文本
        console.log(val) // 这个是解析出的html
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  #app {
    width: 1200px;
    height: 500px;
    margin: 50px auto;
  }

  #editor-main {
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
</style>
```

- `xxx.vue` (le-preview使用)
> 这里展示了两种格式源文件的显示
```vue
<div id="app">
    <div id="main">
        <!--    <h2>通过html方式显示</h2>-->
        <!--    <le-preview ref="html-preview" :value="html" :hljs-css="hljsCss"></le-preview>-->
        <h2>通过markdown方式显示</h2>
        <le-preview ref="md-preview" :is-md="true" :value="mdContent" :hljs-css="hljsCss"></le-preview>
     </div>
</div>

<script>
  export default {
    // ...
    data() {
      return {
        hljsCss: 'agate',
        html: '这里放html文本',
        mdContent: '这里放markdown文本'
      }
    },
    methods: {},
  }
</script>

<style>
  #app {
    width: 1200px;
    height: 500px;
    margin: 50px auto;
  }

  #main {
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
</style>
```
#### 我该如何了解markdown语法？
百度或打开项目根目录下的test.txt，将其拷贝到编辑区，对比右侧看到的预览文本，就能知道如何使用了

### API

### le-editor 相关

#### props(自定义配置)

| 属性        | 说明                                           | 类型    | 默认值                               | 最小版本                           |
| :---------- | :--------------------------------------------- | :------ | :----------------------------------- | ------------------------------------ |
| value       | 可以使用 v-model 双向绑定数据                  | String  | ''                                   |                                    |
| theme       | 编辑器主题                                         | String  | 'base16-dark'                                   |                                    |
| font        | 设置编辑区和展示区的文字大小   | Object  | {editor: 16, preview: 16} |  |
| shadow      | 编辑器是否带阴影效果                           | Boolean | true                                 |                                  |
| dragUpload  | 是否允许拖拽上传图片，需要结合图片上传配置使用 | Boolean | true                                 |                                  |
| showToolbar | 是否显示工具栏                                 | Boolean | true                                 |                                  |
| toolbar     | 菜单栏及快捷键的功能                           | Object  | 见下文                               |                                |
| hljs-css | html显示区域代码高亮样式 | String | 'github' | v1.1.1 |
| fullscreen | 编辑器是否默认全屏 | boolean | false | v1.1.3 |
| indent-unit | 编辑器缩进大小（默认两个空格） | Number | 2 | v1.1.4 |

##### 菜单栏配置配置

```html
// 默认菜单栏配置
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
    skin: true, // 皮肤
    fullScreenEdit: true, // 全屏编辑
    fullScreen: true, // 全窗口预览
    preview: true,  // 实时预览
    save: true,  // 保存预览的html文本
  }
// 使用(例如按照下图的配置，只会显示两个图标)
<template>
  <div id="app">
    <le-editor :toolbar="toolbar"></le-editor>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        toolbar: {
            undo: true,
            redo: true
        }
    }
  }
}
</script>
```

#### events(事件)

| 事件名       | 说明                      | 返回值                      |
| :---------- | :------------------------ | :------------------------  |
| save        | 保存预览文本               | 预览区的html文本             |
| uploadImg   | 上传图片                   | 组件对象、文件以及文件名，详细内容见下文|

### le-preview 相关

#### props(自定义配置)

| 属性     | 说明                                                         | 类型   | 默认值   | 最小版本 |
| :------- | :----------------------------------------------------------- | :----- | :------- | -------- |
| value    | 显示的文本，可传入markdown和html，根据is-md来区分            | String | ''       |          |
| is-md    | value格式，为true则传入的为markdown格式文本，为false则为编辑器保存的html | String | False    |          |
| hljs-css | html显示区域代码高亮样式                                     | String | 'github' | v1.1.1   |

##### hljs-css可用属性值

>  用法参考 `/src/dev/note.html或/src/dev/preview.html`
>
>  样式提取自highlight.js，显示效果可参考：https://highlightjs.org/
>
>  支持的样式值如下

```json
a11yDark
a11yLight
agate
anOldHope
androidstudio
arduinoLight
arta
ascetic
atelierCaveDark
atelierCaveLight
atelierDuneDark
atelierDuneLight
atelierEstuaryDark
atelierEstuaryLight
atelierForestDark
atelierForestLight
atelierHeathDark
atelierHeathLight
atelierLakesideDark
atelierLakesideLight
atelierPlateauDark
atelierPlateauLight
atelierSavannaDark
atelierSavannaLight
atelierSeasideDark
atelierSeasideLight
atelierSulphurpoolDark
atelierSulphurpoolLight
atomOneDarkReasonable
atomOneDark
atomOneLight
brownPaper
codepenEmbed
colorBrewer
darcula
dark
darkula
default
docco
dracula
far
foundation
githubGist
github
gml
googlecode
gradientDark
grayscale
gruvboxDark
gruvboxLight
hopscotch
hybrid
idea
irBlack
isblEditorDark
isblEditorLight
'kimbie.dark'
'kimbie.light'
lightfair
magula
monoBlue
monokaiSublime
monokai
nightOwl
nord
obsidian
ocean
paraisoDark
paraisoLight
pojoaque
purebasic
qtcreatorDark
qtcreatorLight
railscasts
rainbow
routeros
schoolBook
shadesOfPurple
solarizedDark
solarizedLight
sunburst
tomorrowNightBlue
tomorrowNightBright
tomorrowNightEighties
tomorrowNight
tomorrow
vs
vs2015
xcode
xt256
zenburn
```

### 图片上传配置

本地图片上传因为没有各种云存储账号的的原因，所以暂时只支持拖拽或者粘贴剪切板图片（windows粘贴本地图片需要先预览，截图则不需要）上传到Github仓库和自己的服务器，虽然都在说Github访问有点慢，但是我这几天测试了一下，虽然上传速度不快，但是访问时感觉效果还行，但是毕竟免费的，对于没有图床和服务器的用户还是很不错的，介意的话可以传到自己的服务器或者利用拓展方法上传到自己的云存储上。

**注意**：mac系统下粘贴本地图片会在编辑区留下原文件名，windows上没有问题，但是不影响使用，虽然能直接通过编辑器操作去除那一段文本，但是总感觉很别扭，所以就没处理，功能待优化，介意的话，请使用拖拽上传的功能。

图片上传演示：

![图片上传演示](https://cdn.jsdelivr.net/gh/Chave-Z/picture/71d962718f6443abbdea6802ee995f79.gif)

详情请点击这里-->[图片上传配置详情](doc/cn/image.md)

### 编辑器快捷键
**注意：** 这里除了撤销和重做两个功能以外，其它的快捷键只在菜单设置为显示时生效

| 快捷键         | 功能           |
| -------------- | -------------- |
| Ctrl + Z       | 撤销           |
| Ctrl + Y       | 重做           |
| Ctrl + B       | 粗体           |
| Ctrl + D       | 删除线         |
| Ctrl + U       | 下划线         |
| Ctrl + I       | 斜体           |
| Ctrl + Q       | 引用           |
| Ctrl + M       | 标记           |
| Ctrl + L       | 链接           |
| Ctrl + 1(F1)   | 标题1          |
| Ctrl + 2(F2)   | 标题2          |
| Ctrl + 3(F3)   | 标题3          |
| Ctrl + 4(F4)   | 标题4          |
| Ctrl + 5(F5)   | 标题5          |
| Ctrl + 6(F6)   | 标题6          |
| Ctrl + Alt + S | 上角标         |
| Ctrl + Alt + B | 下角标         |
| Ctrl + Alt + L | 居左           |
| Ctrl + Alt + C | 居中           |
| Ctrl + Alt + R | 居右           |
| Ctrl + Alt + O | 有序列表       |
| Ctrl + Alt + U | 无序列表       |
| Ctrl + Alt + H | 分割线         |
| Ctrl + Alt + I | 行内代码       |
| Ctrl + Alt + D | 代码块         |
| Ctrl + Alt + P | 开关实时预览    |
| Ctrl + Alt + F | 开关全窗口预览  |
| Ctrl + S | 保存html文本  |

### 常见问题
- 问：el-form中点击图片上传或表格添加中的按钮会自动刷新问题如何解决
答：[官方文档](https://element.eleme.cn/#/zh-CN/component/form) 中有如下一段话，设置上可以解决：
```
W3C 标准中有如下规定：
When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.
即：当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。
```

