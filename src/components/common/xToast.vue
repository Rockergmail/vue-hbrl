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
import toast from 'vux/src/components/toast'

module.exports = {
  props:{
    tType: {
      type: String,
      twoWay: true
    },
    tTime: {
      type: Number
    },
    tWidth: {
      type: String
    },
    tString: {
      type: String
    }
  },
  components: {
    "toast": toast
  },
  data () {
    return {
      tShow: false,
      timeout: null
    }
  },
  watch: {
    tType: function (val) {
      var allType = ['text', "warn", "cancel", "success"];
      if (allType.indexOf(val) > -1) {
        this.tShow = true
      }
    },
    tShow: function (val) {
      if (val) {
        var _this = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function(){
          _this.tShow = false;

          clearTimeout(_this.timeout2);
          _this.timeout2 = setTimeout(function(){
            _this.tType = "";
          }, _this.tTime)
        }, _this.tTime);
      }
    }
  }
}
</script>
