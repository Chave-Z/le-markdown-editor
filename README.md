## le-notes-editor

### 为何要写
一直以来都有记笔记的习惯，但是之前都是在自己电脑上做记录，有时候在手机想查看很不方便，再加上自己word巨菜以及代码放在word中实在不美观，每次记笔记都感觉吃力不讨好，后来接触markdown，才发现原来记笔记还能这么简单。但是后面随着自己记录的东西越来越多，越来越感觉有时候一图胜千言，但是找了一圈感觉带图片上传的云笔记貌似就没免费的😂。算了，自己先写一个组件吧，等到项目不忙的时候再集成到自己的网站或者工具里作为默认的编辑器用:grimacing:。

### 预览图
![预览图](https://cdn.jsdelivr.net/gh/Chave-Z/picture/46982c0312be4e81b8258db7bdfb43b3.png)

### 支持的语法

将项目根目录下text.txt文件内容拷贝至编辑区，即可在右侧展示区即可看到支持的语法。

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

图片上传暂时支持上传到Github仓库和自己的服务器，虽然都在说Github访问有点慢，但是我这几天测试了一下，感觉效果还行，介意的话可以传到自己的服务器或者利用自定义接口上传到自己的云存储上。

| 参数名           | 默认值    | 描述                                                         |
| ---------------- | --------- | ------------------------------------------------------------ |
| **custom**       | **false** | 当这个参数的值为true时，使用用户自定义的上传方式(**无需配置下列参数**)，否则使用组件自带的方法 |
| **type**         | ''        | 此参数表示图片上传的方式，暂时支持github和server两种方式     |
| **url**          | ''        | 接口地址，当type为server时需要配置                           |
| **token**        | ''        | github的token，当type为github时需要配置                      |
| **repo**         | ''        | github图床所在仓库名，当type为github时需要配置               |
| **username**     | ''        | github用户名，当type为github时需要配置                       |
| **fileNameType** | **uuid**  | 图片上传后的文件名，默认为UUID，为空时则按照原文件名处理     |
| **imagePrefix**  | ''        | 图片地址前缀，为github时推荐使用https://cdn.jsdelivr.net/gh/ |

配置如下：

```json
imageUploader: {
    // 是否使用自定义的图片上传
    custom: false, 
    type: 'github',
    fileNameType: 'uuid',
    url: '',
    token: '',
    username: '',
    repo: '',
    // 图片前缀地址
    imagePrefix: 'https://cdn.jsdelivr.net/gh/' 
  }
```

### 快捷键

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
| Ctrl + Alt + P | 开关实时预览   |
| Ctrl + Alt + F | 开关全窗口预览 |

### 依赖

[markdown-it](https://github.com/markdown-it/markdown-it)及这个仓库下推荐的语法拓展
