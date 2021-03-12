<template>
  <div id="app" :style="appStyle">
    <div id="editor-main">
<!--      <le-editor v-model="value" :image-uploader="imageUploader" @uploadImg="uploadImg" @save="save"></le-editor>-->
       <le-editor v-model="value" :indent-unit="4" :fullscreen="true" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="save"></le-editor>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'app',
        data() {
            return {
                hljsCss: 'agate',
                value: '@[TOC](导航)\n' +
                    'Markdown 语法简介\n' +
                    '# 字符效果、分隔线\n' +
                    '----\n' +
                    '\n' +
                    '~~删除~~\n' +
                    '\n' +
                    '*斜体字*      _斜体字_\n' +
                    '\n' +
                    '**粗体**  __粗体__\n' +
                    '\n' +
                    '***粗斜体*** ___粗斜体___\n' +
                    '\n' +
                    '上标：X<sup>2</sup>，X^2^\n' +
                    '下标：O<sub>2</sub>， X~2~\n' +
                    '\n' +
                    '**缩写(同HTML的abbr标签)**\n' +
                    '\n' +
                    'The <abbr title="Hyper Text Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.\n' +
                    '\n' +
                    '# 引用\n' +
                    '\n' +
                    '> 引用文本\n' +
                    '\n' +
                    '# 锚点与链接 Links\n' +
                    '[普通链接](https://gitee.com/Chave-Z/vue-md-editor/)\n' +
                    '\n' +
                    '[普通链接带标题](https://gitee.com/Chave-Z/vue-md-editor/ "普通链接带标题")\n' +
                    '\n' +
                    '直接链接：<https://gitee.com/Chave-Z/vue-md-editor>\n' +
                    '\n' +
                    '# 代码高亮\n' +
                    '\n' +
                    '## 行内代码\n' +
                    '\n' +
                    '\n' +
                    '执行命令：`Inline code...`\n' +
                    '\n' +
                    '## 缩进风格\n' +
                    '\n' +
                    '    <toolbar ref="toolbar">\n' +
                    '    </toolbar>\n' +
                    '\n' +
                    '## JS代码\n' +
                    '```javascript\n' +
                    'function test() {\n' +
                    '\tconsole.log("Hello world!");\n' +
                    '}\n' +
                    '```\n' +
                    '\n' +
                    '## HTML 代码 HTML codes\n' +
                    '```html\n' +
                    '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '    <head>\n' +
                    '        <mate charest="utf-8" />\n' +
                    '        <title>Hello world!</title>\n' +
                    '    </head>\n' +
                    '    <body>\n' +
                    '        <h1 class="text-xxl">Hello world!</h1>\n' +
                    '    </body>\n' +
                    '</html>\n' +
                    '```\n' +
                    '# 图片 Images\n' +
                    '## 图片 Image\n' +
                    '\n' +
                    '![markdown](https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png)\n' +
                    '## 图片加链接 (Image + Link)\n' +
                    '\n' +
                    '[![](https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png)](https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png "markdown")\n' +
                    '\n' +
                    '---\n' +
                    '\n' +
                    '# 列表 Lists\n' +
                    '\n' +
                    '## 无序列表（减号）Unordered Lists (-)\n' +
                    '\n' +
                    '- 列表一\n' +
                    '- 列表二\n' +
                    '- 列表三\n' +
                    '\n' +
                    '## 无序列表（星号）Unordered Lists (*)\n' +
                    '\n' +
                    '* 列表一\n' +
                    '* 列表二\n' +
                    '* 列表三\n' +
                    '\n' +
                    '## 无序列表（加号和嵌套）Unordered Lists (+)\n' +
                    '+ 列表一\n' +
                    '+ 列表二\n' +
                    '    + 列表二-1\n' +
                    '    + 列表二-2\n' +
                    '    + 列表二-3\n' +
                    '+ 列表三\n' +
                    '    * 列表一\n' +
                    '    * 列表二\n' +
                    '    * 列表三\n' +
                    '\n' +
                    '## 有序列表 Ordered Lists (-)\n' +
                    '\n' +
                    '1. 第一行\n' +
                    '2. 第二行\n' +
                    '3. 第三行\n' +
                    '\n' +
                    '# GFM task list\n' +
                    '\n' +
                    '- [x] GFM task list 1\n' +
                    '- [x] GFM task list 2\n' +
                    '- [ ] GFM task list 3\n' +
                    '    - [ ] GFM task list 3-1\n' +
                    '    - [ ] GFM task list 3-2\n' +
                    '    - [ ] GFM task list 3-3\n' +
                    '- [ ] GFM task list 4\n' +
                    '    - [ ] GFM task list 4-1\n' +
                    '    - [ ] GFM task list 4-2\n' +
                    '\n' +
                    '----\n' +
                    '\n' +
                    '# 绘制表格\n' +
                    '\n' +
                    '| 标题 | 标题 |\n' +
                    '| ------------ | ------------ |\n' +
                    '| 内容内容  | 内容内容 |\n' +
                    '| 内容 | 内容 |\n' +
                    '\n' +
                    '| 标题 | 标题 |\n' +
                    '| :------------ | :------------ |\n' +
                    '| 内容内容内容内容 | 内容内容内容内容 |\n' +
                    '| 内容 | 内容 |\n' +
                    '\n' +
                    '| 标题 | 标题 |\n' +
                    '| :------------: | :------------: |\n' +
                    '| 内容内容内容内容 | 内容内容内容内容 |\n' +
                    '| 内容 | 内容 |\n' +
                    '\n' +
                    '| 标题 | 标题 |\n' +
                    '| ------------: | ------------: |\n' +
                    '| 内容内容内容内容 | 内容内容内容内容 |\n' +
                    '| 内容 | 内容 |\n' +
                    '----\n' +
                    '\n' +
                    '# Emoji表情\n' +
                    '访问 [webfx](https://www.webfx.com/tools/emoji-cheat-sheet/) 参考更多使用方法。\n' +
                    '\n' +
                    ':sunny: :umbrella: :cloud: :snowflake: :snowman: :zap: :cyclone:  :foggy: :ocean: :cat: :dog:\n' +
                    '# LaTeX 公式\n' +
                    '\n' +
                    '`$` 表示行内公式： \n' +
                    '\n' +
                    '质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达。\n' +
                    '\n' +
                    '`$$ `表示整行公式：\n' +
                    '\n' +
                    '$$\\sum_{i=1}^n a_i=0$$\n' +
                    '\n' +
                    '$$f(x_1,x_x,\\ldots,x_n) = x_1^2 + x_2^2 + \\cdots + x_n^2 $$\n' +
                    '\n' +
                    '$$\\sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$$\n' +
                    '\n' +
                    '访问 [MathJax](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) 参考更多使用方法。\n' +
                    '\n' +
                    '# 流程图\n' +
                    '\n' +
                    '```flow\n' +
                    'start=>start: 开始\n' +
                    'loginInfo=>inputoutput: 登录数据\n' +
                    'verifyLogin=>subroutine: 登录验证\n' +
                    'isSuccess=>condition: 验证成功？\n' +
                    'respondSuccess=>operation: 响应成功\n' +
                    'responseFailure=>operation: 响应失败\n' +
                    'end=>end: 结束\n' +
                    '\n' +
                    'start->loginInfo->verifyLogin->isSuccess\n' +
                    'isSuccess(yes)->respondSuccess->end\n' +
                    'isSuccess(no)->responseFailure->end\n' +
                    '```\n' +
                    '\n' +
                    '# 视频、音频\n' +
                    '\n' +
                    '<video id="video"\n' +
                    '           controls=""\n' +
                    '           preload="none"\n' +
                    '           width="100%"\n' +
                    '           >\n' +
                    '    <source id="mp4"\n' +
                    '              src="https://www.w3school.com.cn/i/movie.ogg"\n' +
                    '              type="video/mp4">\n' +
                    '</video>\n' +
                    '\n' +
                    '<audio id="audio"\n' +
                    '        controls=""\n' +
                    '        preload="none">\n' +
                    '    <source id="mp3"\n' +
                    '          src="http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_849867&response=res&type=convert_url&">\n' +
                    '</audio>\n' +
                    '\n' +
                    '# 脚注\n' +
                    '生成一个脚注1[^footnote].\n' +
                    '生成一个脚注2[^foot].\n' +
                    '[^footnote]: 这里是 **脚注** 的 *内容*.\n' +
                    ' [^foot]:这里是**脚注2**的*内容*.\n',
                appStyle: {
                    // width: document.documentElement.clientWidth + 'px',
                    // height: document.documentElement.clientHeight + 'px'
                },
                // 自定义
                // imageUploader: {
                //   custom: true,
                //   fileType: 'file',
                //   fileNameType: 'uuid',
                //   imagePrefix: 'https://cdn.jsdelivr.net/gh/', // 图片前缀地址
                // }
                imageUploader: {
                    custom: false,
                    fileType: 'file',
                    fileNameType: '',
                    imagePrefix: 'http://106.54.92.121', // 图片前缀地址
                    type: 'server',
                    url: 'http://106.54.92.121:82/upload'
                }
            }
        },
        methods: {
            // 自定义
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
                console.log(this.value)
                console.log(val)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 500px;
    margin: 50px auto;
    display: flex;
    justify-content: center;
  }

  #editor-main {
    color: #2c3e50;
    width: 85%;
    height: 100%;
  }
</style>
