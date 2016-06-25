<template>

<style scoped>
/*  .weui_toast {
      position: fixed;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      top:50%;
      left:50%;
      z-index: 3;
      min-height: 7.6em;
      background: white;
      text-align: center;
      border-radius: 6px;
      padding:16px 0;
  }

  .weui_btn{
    font-size:16px;
  }
  .weui_btn_primary{
    background: #75CCFF;
    color:white;
  }*/
</style>

  <div id="ximi_toast">
    <!-- 超时 -->
    <toast :show="matchType(type=='timeout')" type="text" :time="time" :width="tWidth">一大波用户在涌入，请稍后再试</toast>

    
  </div>
</template>

<script>
import toast from 'vux/src/components/toast'

module.exports = {
  props:{
    type: {
      type: String
    }
  },
  components: {
    "toast": toast
  },
  data () {
    return {
      time: 2000,
      tWidth: '80%',
      monitor: false, // 根据moniter的改变表示激活
    }
  },
  watch: {
    monitor: function (val) {
      var _this = this;
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function(){
          _this.type = "none"
        }, _this.time)
    }
  },
  methods: {
    matchType: function(isType){
      if (isType) {
        this.monitor = !this.monitor
      }
      return isType
    }
  }
}
</script>
