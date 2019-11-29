<template>
  <div id="app">
    <div id="editor-main">
      <le-notes></le-notes>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
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
