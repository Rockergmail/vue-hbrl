<template>

  <div id="ximi_toast">
    <!-- 超时 -->
    <toast :show="0 == tType" type="text" :time="tTime" :width="tWidth">{{ tString }}</toast>

    <toast :show="1 == tType" type="success" :time="tTime" :width="tWidth">{{ tString }}</toast>

    <toast :show="2 == tType" type="cancel" :time="tTime" :width="tWidth">{{ tString }}</toast>

    <toast :show="3 == tType" type="warn" :time="tTime" :width="tWidth">{{ tString }}</toast>
    
  </div>
</template>

<script>
// FIXME: timeout不能clear

import toast from 'vux/src/components/toast'

module.exports = {
  props:{
    tType: {
      type: Number,
      twoWay: true
    },
    tTime: {
      type: Number
    },
    tWidth: {
      type: String
    },
    tString: {
      type: String,
      twoWay: true
    }
  },
  components: {
    "toast": toast
  },
  data () {
    return {
      timer: null
    }
  },
  watch: {
    tType: function (val) {
      if (val != -1) {
        this.resetToast()
      }
    },
    tString: function (val) {
      this.resetToast()
    }
  },
  methods: {
    resetToast: function(){
      var _this = this;
      clearTimeout(this.timer);
      this.timer = null ;
      this.timer = setTimeout(function(){
        _this.tType = -1
      }, this.tTime);
    }
  }
}
</script>
