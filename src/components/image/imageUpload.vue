<style scoped>
.dropbox {
  min-height: 262px;
  min-width: 410px;
  color: #666;
  position: fixed;
  z-index: 99999;
  display: block;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  -ms-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  -o-box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background: #fff;
  font-size: 14px;
  display: block;
  z-index: 99999;
  width: 30%;
  height: 40%;
  top: 30%;
  left: 35%;
  margin: 0 auto;
}

.dialog-header {
  padding: 11px 20px;
  border-bottom: 1px solid #eee;
  -webkit-transition: background 300ms ease-out;
  -moz-transition: background 300ms ease-out;
  transition: background 300ms ease-out;
}

.dialog-close {
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 18px;
  color: #ccc;
  -webkit-transition: color 300ms ease-out;
  -moz-transition: color 300ms ease-out;
  transition: color 300ms ease-out;
}

.dialog-close a {
  text-decoration: none;
}
.fa {
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translate(0, 0);
}
.dialog-container {
  position: relative;
  padding: 20px;
  line-height: 1.4;
}
.dialog-form {
  color: #666;
}

.dialog-form label {
  float: left;
  display: block;
  width: 75px;
  text-align: left;
  padding: 7px 0 15px 5px;
  margin: 0 0 2px;
  font-weight: 400;
}

.dialog-form input[type="text"] {
  display: inline-block;
  width: 264px;
}
.dialog-form input[type="text"],
.dialog-form input[type="number"] {
  color: #999;
  padding: 8px;
  border: 1px solid #ddd;
}

.dialog-footer {
  padding: 10px 0 0;
  text-align: right;
}

.dialog-container .dialog-btn,
.dialog-footer .dialog-btn,
.dialog-form .dialog-btn {
  color: #666;
  min-width: 75px;
  cursor: pointer;
  background: #fff;
  padding: 7px 10px;
  border: 1px solid #ddd;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: background 300ms ease-out;
  -moz-transition: background 300ms ease-out;
  transition: background 300ms ease-out;
}
</style>
<template>
  <div class="dropbox p-3">
    <div class="dialog-header"
         style="cursor: move;"><strong class="dialog-title">添加图片</strong>
    </div>
    <a href="javascript:;"
       class="fa fa-close dialog-close"></a>
    <div class="dialog-container">
      <div class="dialog-form">
        <label>图片描述</label><input type="text"
               value=""
               data-alt="">
        <br><br>
        <label>图片链接</label><input type="text"
               value="http://"
               data-link="">
      </div>
      <div class="dialog-footer">
        <button class="dialog-btn dialog-enter-btn">确定</button>
        <button class="dialog-btn dialog-cancel-btn">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imageUpload',
  data () {
    return {
      files: []
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>
