<style lang="css" scoped>
@import "./index.css";
@import "../../assets/css/github-markdown.css";
@import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css");
</style>
<template>
  <div id="le-markdown-body">
    <div class="markdown-body" v-html="html"></div>

    <!-- 大图预览 -->
    <transition name="le-img-preview-animation">
      <div
        class="le-img-preview"
        @click="previewImg = ''"
        :style="imgPreviewStyle"
        v-if="previewImg!==''"
      >
        <img :src="previewImg" id="le-img-preview-content" alt />
      </div>
    </transition>
  </div>
</template>
<script>
import flowchart from "flowchart.js";
import { toKebabCase, hljsCssConfig } from "../../lib/core/hljs-plugn";
import md from "../../lib/core/markdown";

export default {
  name: "le-preview",
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
      content: "",
      oldStyle: "",
      currentStyle: "",
      html: "",
      previewImg: "",
      imgPreviewStyle: {
        minWidth: document.documentElement.clientWidth + "px",
        minHeight: document.documentElement.clientHeight + "px"
      }
    };
  },
  watch: {
    value(value) {
      this.content = value;
    },
    content(value) {
      if (this.isMd) {
        this.html = md.render(value);
      } else {
        this.html = value;
      }
      this.$nextTick().then(() => {
        // setTimeout(function () {
        this.$el.querySelectorAll(".md-flowchart").forEach(element => {
          try {
            let code = element.textContent;
            let chart = flowchart.parse(code);
            element.textContent = "";
            chart.drawSVG(element);
          } catch (e) {
            element.outerHTML = `<pre>error: ${e}</pre>`;
          }
        });
        // }, 3000)
      });
    },
    hljsCss(value) {
      if (this.oldStyle !== "") {
        this.removeCss(this.oldStyle);
      }
      if (hljsCssConfig[`${this.hljsCss}`]) {
        this.currentStyle = toKebabCase(this.hljsCss);
      } else {
        this.currentStyle = "github";
      }
      this.oldStyle = this.currentStyle;
      this.loadCss();
    }
  },
  methods: {
    loadCss() {
      let element = document.createElement("link");
      element.setAttribute("rel", "stylesheet");
      element.setAttribute("type", "text/css");
      element.setAttribute(
        "href",
        `https://cdn.bootcss.com/highlight.js/9.18.1/styles/${this.currentStyle}.min.css`
      );
      document.getElementsByTagName("head")[0].appendChild(element);
    },
    removeCss(cssName) {
      let element = "link";
      let attr = "href";
      let elements = document.getElementsByTagName(element);
      for (let i = elements.length; i >= 0; i--) {
        if (
          elements[i] &&
          elements[i].getAttribute(attr) != null &&
          elements[i].getAttribute(attr).indexOf(cssName) !== -1
        ) {
          elements[i].parentNode.removeChild(elements[i]);
        }
      }
    }
  },
  created() {},
  mounted() {
    let that = this;
    this.content = this.value;
    if (hljsCssConfig[`${this.hljsCss}`]) {
      this.currentStyle = toKebabCase(this.hljsCss);
    } else {
      this.currentStyle = "github";
    }
    this.oldStyle = this.currentStyle;
    this.loadCss();
    // 监听屏幕大小
    window.addEventListener("resize", () => {
      that.imgPreviewStyle.minWidth =
        document.documentElement.clientWidth + "px";
      that.imgPreviewStyle.minHeight =
        document.documentElement.clientHeight + "px";
    });
    // 监听图片点击
    this.$el
      .querySelector(".markdown-body")
      .addEventListener("click", function(event) {
        event = event ? event : window.event;
        let ele = event.srcElement ? event.srcElement : event.target;
        if (ele.tagName === "IMG") {
          // 当且仅当点击的是预览区图片且不是预览大图
          if (ele.id !== "le-img-preview-content") {
            that.previewImg = ele.src;
          }
        }
      });
  }
};
</script>
