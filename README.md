## le-notes-editor

### 为何要写
一直以来都有记笔记的习惯，但是之前都是在自己电脑上做记录，有时候在手机想查看很不方便，再加上自己word巨菜以及代码放在word中实在不美观，每次记笔记都感觉吃力不讨好，后来接触markdown，才发现原来记笔记还能这么简单。但是后面随着自己记录的东西越来越多，越来越感觉有时候一图胜千言，但是找了一圈感觉带图片上传的云笔记貌似就没免费的😂。算了，自己先写一个组件吧，等到项目不忙的时候再集成到自己的网站或者工具里作为默认的编辑器用:grimacing:。

### 预览图
![预览图](https://cdn.jsdelivr.net/gh/Chave-Z/picture/46982c0312be4e81b8258db7bdfb43b3.png)

### 特性
- 导航
- 标题
- 文字效果
- 引用
- 脚注
- 上角标、下角标
- 有序列表、无序列表、任务清单
- 代码缩进、代码高亮
- 图片上传(本地图片拖拽上传、网络图片添加)
- html内嵌(视频、音频等)
- Emoji 表情
- LaTeX 公式
- 流程图
- 编辑器样式
- 编辑器换肤功能
- ...

### 使用

- `index.js` 或 `main.js` 中

```javascript
import Vue from 'vue'
import leNotesEditor from 'le-notes-editor'
// ...
Vue.use(leNotesEditor)
// ....
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
```
- `index.html`

```vue
<div id="editor-main">
      <le-notes></le-notes>
</div>

<style>
#editor-main{
  width: 1100px
  height: 500px;
}
</style>
```

### 自定义配置

| 属性        | 说明                                           | 类型    | 默认值                               |
| :---------- | :--------------------------------------------- | :------ | :----------------------------------- |
| value       | 可以使用 v-model 双向绑定数据                  | Sting   | ''                                   |
| font        | 设置编辑区和展示区的文字大小，这个得成对配置   | Object  | {  textArea: '16px', mdBody: '16px'} |
| shadow      | 编辑器是否带阴影效果                           | Boolean | true                                 |
| dragUpload  | 是否允许拖拽上传图片，需要结合图片上传配置使用 | Boolean | true                                 |
| showToolbar | 是否显示工具栏                                 | Boolean | true                                 |
| toolbar     | 菜单栏及快捷键的功能                           | Object  | 见下文                               |

#### 菜单栏配置配置

```html
// 默认配置
toolbar: {
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
    fullScreen: true, // 全窗口预览
    preview: true,  // 实时预览
  }
// 使用(按照下图的配置，只会显示两个图标)
<template>
  <div id="app">
    <le-notes :toolbar="toolbar"></le-notes>
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

#### 图片上传配置

本地图片上传因为没有云存储账号的缘故，所以暂时只支持拖拽上传到Github仓库和自己的服务器，虽然都在说Github访问有点慢，但是我这几天测试了一下，虽然上传速度不快，但是访问时感觉效果还行，介意的话可以传到自己的服务器或者利用拓展方法上传到自己的云存储上。

| 参数名           | 默认值    | 描述                                                         |
| ---------------- | --------- | ------------------------------------------------------------ |
| **custom**       | **false** | 当这个参数的值为true时，使用用户自定义的上传方式(**无需配置下列参数**)，否则使用组件自带的方法 |
| **type**         | ''        | 此参数表示图片上传的方式，暂时支持github和server两种方式     |
| **url**          | ''        | 接口地址，当`type`为`server`时需要配置                           |
| **token**        | ''        | `github`的`token`，当`type`为`github`时需要配置                     |
| **repo**         | ''        | `github图床所在仓库名，当`type`为`github`时需要配置                |
| **username**     | ''        | `github`用户名，当`type`为`github`时需要配置                       |
| **fileType**     | ''        | 使用自定义上传时返回的文件类型，可选值为`file`和`base64`,不填则为file类型 |
| **fileNameType** | **uuid**  | 图片上传后的文件名，默认为`uuid`，为空时则按照原文件名处理     |
| **imagePrefix**  | ''        | 图片地址前缀，为github时推荐使用https://cdn.jsdelivr.net/gh/ |

配置的基本格式如下：

```javascript
imageUploader: {
    // 是否使用自定义的图片上传
    custom: false, 
    type: '',
    fileNameType: 'uuid',
    url: '',
    token: '',
    username: '',
    repo: '',
    fileType:'',
    // 图片前缀地址
    imagePrefix: 'https://cdn.jsdelivr.net/gh/' 
}
```
只需要按照表格中的配置完毕，然后传递给组件即可，例如要使用自定义功能，步骤如下：
```vue
<template>
  <div id="app">
    <div id="editor-main">
      <le-notes :image-uploader="imageUploader" @uploadImg="uploadImg"></le-notes>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        imageUploader:{
            custom: true,
            fileType:'file',
            fileNameType: 'uuid',
            imagePrefix: 'https://cdn.jsdelivr.net/gh/', // 图片前缀地址
        }
    }
  },
  methods:{
      uploadImg:function ($vm,file,fileName) {
        console.log($vm) // 组件对象
        console.log(file) // 文件 file或者是base64串，基于配置
        console.log(fileName) // 文件名 uuid或原文件名 基于配置
        // 添加图片
        // 两个参数 第一个是图片访问路径 第二个是文件名
        $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${fileName}`, fileName)
      }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1100px;
  height: 500px;
  margin: 50px auto;
}
#editor-main{
  width: 100%;
  height: 100%;
}

</style>
```

### 快捷键
**注意：** 这里除了撤销和重做两个功能以外，其它的快捷键只在菜单显示是生效

| 快捷键         | 功能           |
| -------------- | -------------- |
| Ctrl + Z       | 撤销           |
| Ctrl + Z       | 重做           |
| Ctrl + B       | **粗体**       |
| Ctrl + D       | ~~删除线~~     |
| Ctrl + U       | ++下划线++     |
| Ctrl + I       | *斜体*         |
| Ctrl + Q       | 引用           |
| Ctrl + M       | ==标记==       |
| Ctrl + L       | 链接           |
| Ctrl + 1(F1)   | 标题1          |
| Ctrl + 2(F2)   | 标题2          |
| Ctrl + 3(F3)   | 标题3          |
| Ctrl + 4(F4)   | 标题4          |
| Ctrl + 5(F5)   | 标题5          |
| Ctrl + 6(F6)   | 标题6          |
| Ctrl + Alt + S | X^2^           |
| Ctrl + Alt + B | X~2~           |
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
