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
        console.log($vm)
        console.log(file)
        console.log(fileName)
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
