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

  <div id="ximi_popup">
      <!-- 超时 -->
      <!-- <div v-if="type === 'timeout'"> -->
      <div>
        <toast :show="match" type="text" :time="time" :width="tWidth">一大波用户在涌入，请稍后再试</toast>
      </div>

    
    
    <!-- 领钱失败 -->

    <!-- 放弃任务 -->
  </div>
</template>

<script>
import toast from 'vux/src/components/toast'
// import flexbox from "vux/src/components/flexbox/index.vue"
// import flexboxItem from "vux/src/components/flexbox-item/index.vue"

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
      types: ['timeout', 'activate', 'takeok', 'takefail', 'update1'],
      time: 3000,
      tWidth: 'auto',
      // activate： 激活小助手
      // giveup： 放弃任务
      // takefail: 领钱失败
      // takeok: 领钱成功
      // update: 升级小助手
      match: true // 传入的type是否匹配types
    }
  },
  watch: {
    match: function (val) {
      var _this = this;
      console.log(val)
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function(){
          _this.match = false
        }, _this.time)
      }
    }
  },
  methods: {
    matchType: function(type){
      this.match = this.types.indexOf(type) > -1;
      return this.match
    }
  }
}
</script>
