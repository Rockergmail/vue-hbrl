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
  .weui_btn_primary.primary{
    background: #DD5555
  }
</style>

  <div id="ximi_popup" v-if="templates.indexOf(pType) > -1">
    <div class="weui_mask"></div>
    <div class="weui_xpopup" :style="{width:pWidth}">
      <!-- 领钱失败 -->
      <div v-if="pType == 'getMoneyFail'">
        <img src="../2.png">
        <p style="color:#646464;margin-top:6px">任务进行中 ...</p>
        <p style="color:#898989;margin:6px 0 20px">若无法完成，请手动重启应用后提交</p>
        <x-button @click="clickNo" text="知道了" style="padding:6px 0" type="primary"></x-button>
      </div>

      <!-- 领钱成功 -->
      <div v-if="pType == 'getMoneySuccess'">
        <p style="color:#75CCFF;margin-top:6px;font-size:24px">恭喜！完成任务！</p>
        <p style="color:#898989;margin:6px 0 4px">完成：{{pValue.taskType}}“{{pValue.taskName}}”</p>
        <p style="color:#75CCFF;font-size:26px">
          +
          <span style="font-size:46px;">{{pValue.taskMoney}}</span>
          元
        </p>
        <x-button @click="clickNo" text="继续赚钱" style="padding:6px 0" type="primary"></x-button>
      </div>

    <!-- 激活小助手 -->    
    <div v-if="pType == 'activate'">
      <img src="../1.png">
      <p style="color:#898989;margin:6px 0 20px">未检测到激活小助手，请打开助手</p>
      <x-button @click="clickYes" text="打开小助手" style="padding:6px 0" type="primary" class="primary"></x-button>
    </div>

    <!-- 放弃任务 -->
    <div v-if="pType == 'giveup'">
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
    pType: {
      type: String,
      twoWay: true
    },
    customClickYes: {
      type: Function,
      twoWay: true
    },
    pValue: {
      type: Object,
      twoWay: true
    }
  },
  components: {
    "x-button": xButton,
    "flexbox": flexbox,
    "flexbox-item": flexboxItem
  },
  data () {
    return {
      templates: ['getMoneyFail', 'getMoneySuccess', 'giveup', 'activate', 'update1'],
      // activate： 激活小助手
      // giveup： 放弃任务
      // takefail: 领钱失败
      // takeok: 领钱成功
      // update: 升级小助手

    }
  },
  methods: {
    clickNo: function() {
      this.pType = "";
      this.customClickYes = function(){};
      this.pValue = {};
    },
    clickYes: function() {
      this.customClickYes();
      this.clickNo();
    },
    customClickYes: function(){

    }
  }
}
</script>