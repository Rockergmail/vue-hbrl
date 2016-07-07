<template>
  <div class="vux-off-canvas-menu has-transition" :class="{'is-open': show}">
    
  </div>
  <div id="vux-off-canvas">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      required: true
    }
  },
  watch: {
    show (val) {
      if (val) {
        document.querySelector(this.content).classList.add('has-transition')
        document.querySelector(this.content).classList.add('is-open')
      } else {
        document.querySelector(this.content).classList.remove('is-open')
      }
    }
  }
}
</script>

<style>
.vux-off-canvas-menu {
  -webkit-overflow-scrolling: touch; /* enables momentum scrolling in iOS overflow elements */
  position: fixed;
  left: -200px;
  top: 0;
  width: 200px;
  height: 100%;
  z-index: 9999;
  background-color: #FFE200;
}
.has-transition {
   transition: transform .2s cubic-bezier(.16, .68, .43, .99);
  /* improves performance issues on mobile */
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
.is-open {
  transform: translate3d(200px, 0, 0);
}
</style>