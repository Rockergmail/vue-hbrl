<template>

<style scoped>
  .weui_xpopup {
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
  }
</style>

  <div id="ximi_popup" v-if="templates.indexOf(template) > -1">
    <div class="weui_mask"></div>
    <div class="weui_xpopup" :style="{width:pWidth}">
      <!-- 领钱成功 -->
      <div v-if="template === 'takeok'">
        <img src="../2.png">
        <p style="color:#646464;margin-top:6px">任务进行中 ...</p>
        <p style="color:#898989;margin:6px 0 20px">若无法完成，请手动重启应用后提交</p>
        <x-button @click="clickYes" text="知道了" style="padding:6px 0" type="primary"></x-button>
      </div>
    
    
    <!-- 领钱失败 -->

    <!-- 放弃任务 -->
    <div v-if="template === 'giveup'">
      <img src="../1.png">
      <p style="color:#898989;margin:6px 0 20px">确定要放弃当前任务吗？</p>
      <flexbox :gutter="0" style="padding:0 5%">
        <flexbox-item :span="1/2">
          <x-button @click="clickNo" text="取消" style="padding:6px 0;color:#ccc"></x-button>
        </flexbox-item>
        <flexbox-item :span="1/2">
          <x-button @click="clickYes" text="放弃任务" style="padding:6px 0" type="primary"></x-button>
        </flexbox-item>
      </flexbox>
    </div>


    </div>
  </div>
</template>

<script>
import xButton from 'vux/src/components/x-button'
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"

module.exports = {
  props:{
    pWidth: {
      type: String,
      default: "88%"
    },
    template: {
      type: String
    },
    clickYes: {
      type: Function
    },
    clickNo: {
      type: Function
    }
  },
  components: {
    "x-button": xButton,
    "flexbox": flexbox,
    "flexbox-item": flexboxItem
  },
  data () {
    return {
      templates: ['giveup', 'activate', 'takeok', 'takefail', 'update1'],
      // activate： 激活小助手
      // giveup： 放弃任务
      // takefail: 领钱失败
      // takeok: 领钱成功
      // update: 升级小助手

    }
  },
  methods: {
    clickNo: function() {
      this.template = 'none';
    },
    clickYes: function() {
      
    }
  }
}
</script>
