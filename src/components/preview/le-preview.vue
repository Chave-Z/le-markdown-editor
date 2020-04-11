<style lang="css" scoped>
  @import "./index.css";
  @import "../../assets/css/github-markdown.css";
  @import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");
  @import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div class="markdown-body" v-html="html">
  </div>
</template>
<script>
  import flowchart from 'flowchart.js'
  import {toKebabCase, hljsCssConfig} from '../../lib/core/hljs-plugn'
  import md from '../../lib/core/markdown'

  export default {
    name: 'le-preview',
    props: {
      isMd: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ""
      },
      hljsCss: {
        type: String,
        default: "github"
      }
    },
    data() {
      return {
        content: '',
        oldStyle: '',
        currentStyle: '',
        html: ''
      }
    },
    watch: {
      value(value) {
        this.content = value
      },
      content(value) {
        if (this.isMd) {
          this.html = md.render(value)
        } else {
          this.html = value
        }
        this.$nextTick().then(() => {
          // setTimeout(function () {
            document.querySelectorAll('.md-flowchart').forEach(element => {
              try {
                let code = element.textContent
                let chart = flowchart.parse(code)
                element.textContent = ''
                chart.drawSVG(element)
              } catch (e) {
                element.outerHTML = `<pre>error: ${e}</pre>`
              }
            })
          // }, 3000)
        })
      },
      hljsCss(value) {
        if (this.oldStyle !== '') {
          this.removeCss(this.oldStyle)
        }
        if (hljsCssConfig[`${this.hljsCss}`]) {
          this.currentStyle = toKebabCase(this.hljsCss)
        } else {
          this.currentStyle = 'github'
        }
        this.oldStyle = this.currentStyle
        this.loadCss()
      }
    },
    methods: {
      loadCss() {
        let element = document.createElement("link")
        element.setAttribute("rel", "stylesheet")
        element.setAttribute("type", "text/css")
        element.setAttribute("href", `https://cdn.bootcss.com/highlight.js/9.18.1/styles/${this.currentStyle}.min.css`)
        document.getElementsByTagName("head")[0].appendChild(element);
      },
      removeCss(cssName) {
        let element = "link"
        let attr = "href"
        let elements = document.getElementsByTagName(element)
        for (let i = elements.length; i >= 0; i--) {
          if (elements[i] && elements[i].getAttribute(attr) != null
            && elements[i].getAttribute(attr).indexOf(cssName) !== -1) {
            elements[i].parentNode.removeChild(elements[i])
          }
        }
      }
    }
    ,
    created() {
    },
    mounted() {
      this.content = this.value
      if (hljsCssConfig[`${this.hljsCss}`]) {
        this.currentStyle = toKebabCase(this.hljsCss)
      } else {
        this.currentStyle = 'github'
      }
      this.oldStyle = this.currentStyle
      this.loadCss()
    }
  }
</script>
