### 简介
本地图片上传因为没有各种云存储账号的的原因，所以暂时只支持拖拽或者粘贴剪切板图片（windows粘贴本地图片需要先预览，截图则不需要）上传到Github仓库和自己的服务器，虽然都在说Github访问有点慢，但是我这几天测试了一下，虽然上传速度不快，但是访问时感觉效果还行，但是毕竟免费的，对于没有图床和服务器的用户还是很不错的，介意的话可以传到自己的服务器或者利用拓展方法上传到自己的云存储上。

**注意**：mac系统下粘贴本地图片会在编辑区留下原文件名，windows上没有问题，但是不影响使用，虽然能直接通过编辑器操作去除那一段文本，但是总感觉很别扭，所以就没处理，功能待优化，介意的话，请使用拖拽上传的功能。

#### 图片上传演示：

![图片上传演示](https://cdn.jsdelivr.net/gh/Chave-Z/picture/71d962718f6443abbdea6802ee995f79.gif)

#### 参数列表
| 参数名           | 默认值                           | 描述                                                         |
| ---------------- | -------------------------------- | ------------------------------------------------------------ |
| **custom**       | **false**                        | 当这个参数的值为true时，组件使用用户自定义的上传方式，否则使用组件自带的方法 |
| **type**         | ''                               | 此参数表示组件内置的图片上传的方式，暂时支持`github`和`server`两种方式 |
| **url**          | ''                               | 接口地址，当`type`为`server`时需要配置                       |
| **token**        | ''                               | `github`的`token`，当`type`为`github`时需要配置              |
| **repo**         | ''                               | `github`图床所在仓库名，当`type`为`github`时需要配置         |
| **username**     | ''                               | `github`用户名，当`type`为`github`时需要配置                 |
| **fileType**     | ''                               | 使用自定义上传时返回的文件类型，可选值为`file`和`base64`,不填则为file类型 |
| **fileNameType** | **uuid**                         | 图片上传后的文件名，默认为`uuid`，为空时则按照原文件名处理   |
| **imagePrefix**  | **https://cdn.jsdelivr.net/gh/** | 图片地址前缀，为`github`时推荐使用CDN：https://cdn.jsdelivr.net/gh/ |

#### 配置的基本格式如下：

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
#### 使用内置的服务器上传，步骤如下：
```vue
<template>
  <div id="app">
    <div id="editor-main">
      <le-editor :image-uploader="imageUploader" @save="save"></le-editor>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                imageUploader: {
                    custom: false,
                    fileType: 'file',
                    fileNameType: '',
                    imagePrefix: 'http://106.54.92.121', // 图片前缀地址
                    type: 'server',
                    url: 'http://106.54.92.121:82/upload' // 接口地址
                }
            }
        },
        methods: {
            save: function (val) {
                // 获取预览文本
                console.log(val)
            }
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

#### 使用内置的GitHub作为图床，步骤如下
1. 首先你登录你的GitHub账号，然后创建一个仓库，记下仓库地址。
2. 生成一个token用于本组件操作你的仓库，具体步骤如下：
- 访问：https://github.com/settings/tokens，然后点击右上角的`Generate new token`。
- 勾选`repo`。然后翻到页面最底部，点击绿色按钮`Generate token`的按钮生成token。
- 生成后记得拷贝一下生成的token，不然忘记了只能重新生成了。

<img width=700 src="https://cdn.jsdelivr.net/gh/Chave-Z/picture/004e4e5d3c5c462d999cdfbcd3383bcf.png"/>
<img width=700 src="https://cdn.jsdelivr.net/gh/Chave-Z/picture/f3f3f04e93954c92bb917e1613695fad.png"/>
<img width=700 src="https://cdn.jsdelivr.net/gh/Chave-Z/picture/652396e7c3044a0fa8c3a57182416a5c.png"/>

接下来简单配置一下组件，就能愉快的使用了：
```vue
<template>
  <div id="app">
    <div id="editor-main">
      <le-editor :image-uploader="imageUploader" @save="save"></le-editor>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                imageUploader: {
                  custom: false,
                  type: 'github',
                  username: 'xxx', // github的用户名
                  repo: 'xxx', // 上面新建的仓库地址
                  token: 'xxxxxxx', // 自己的token
                  fileType: 'base64', // 必须为base64
                  fileNameType: 'uuid',
                  imagePrefix: 'https://cdn.jsdelivr.net/gh/', // 图片前缀地址
                }
            }
        },
        methods: {
            save: function (val) {
                // 获取预览文本
                console.log(val)
            }
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

#### 使用用户自定义功能，步骤如下：
```vue
<template>
  <div id="app">
    <div id="editor-main">
      <le-editor :image-uploader="imageUploader" @uploadImg="uploadImg"></le-editor>
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
        // 两个参数 第一个是图片访问路径 第二个是文件名 按照如下类似的方法即可向编辑区插入上传好的图片了
        $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${fileName}`, fileName)
      }
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
