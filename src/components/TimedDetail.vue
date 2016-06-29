
<template>
<style scoped>
    body{background:#F5F4F9;}
    #list{padding:0 4% 12px;}
   .mission-item{background: white;border-radius: 6px;margin-top:12px;}

   .item-icon{text-align: center;padding-left:0.25rem;}
   .item-icon img{border-radius: 6px}

   .item-text{border-right:1px dashed #E3E2E1;position: relative;padding:16px 0.375rem; color:#676767;}
   .item-text .mission-title{margin-bottom:2px;}
   .item-text .tag{font-size: 11px;color:#bcbcbc;}
   .item-text .mission-tag{border-radius: 2px;border:1px solid #E3E2E1;padding:2px;}
   .item-text .mission-rest{color:#DD5555;}

   .item-status{text-align: center;}
   .item-status .mission-on{color:#DD5555;font-size:18px;}
   .item-status .mission-point{color:#FA8919}
   .item-status .mission-point{font-size:30px;}
   .item-status .mission-point .rmb{font-size: 20px;}

    .dot-top,.dot-bottom{position: absolute;width:10px;height:10px;border-radius:50%;background: #F5F4F9;right:-5px;}
    .dot-top{
        top:-5px;
    }
    .dot-bottom{
        bottom:-5px;
    }

    #mission-tips{
        padding: 12px;
        margin-top:12px;
        margin-bottom: 16px;
        background: white;
        border-radius:6px;
        font-size: 12px;
        color:#898989;
    }

    #mission-tips .red{
        color:#DD5555;
    }

    #mission-btn .btn{
        background: #DD5555;
        border-radius: 6px;
        color:white;
        text-align: center;
        margin-bottom: 18px;
    }
    #mission-btn .step-text{
        border-right:1px solid #EDA5A5;
        padding:12px 0;
    }
</style>
    
<div id="timedDetail">
<sticky>
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:true}"
    >任务详情</x-header>
</sticky>

<section id="list">
    <!-- 任务信息 -->
    <flexbox :gutter="0" class="mission-item">
        <flexbox-item :span="2/10" class="item-icon">
            <img :src="data.iconUrl" width="80%">
        </flexbox-item>

        <flexbox-item :span="5/10" class="item-text">
            <div class="mission-info">
                <p class="mission-title">{{data.name}}</p>
                <p class="tag">
                    <span class="mission-tag" v-if="data.isfree">免费</span>
                    <span class="mission-tag" v-else>付费</span>

                    <span class="mission-tag">剩 <span class="mission-rest">{{data.remainNumber}}</span> 份</span>
                </p>
            </div>
            <i class="dot-top"></i>
            <i class="dot-bottom"></i>
        </flexbox-item>

        <flexbox-item :span="3/10" class="item-status">
            <p class="mission-point"><span class="rmb">￥</span>{{data.point/100}}</p>
        </flexbox-item>
    </flexbox>

    <!-- 任务提示 -->
    <div id="mission-tips">
        <ul>
            <li>1.点击“复制关键词”</li>
            <li>2.点击“马上开始任务”进入App Store<span class="red">粘贴搜索</span></li>
            <li>3.<span class="red">大概在第{{data.rank}}位</span>，下载安装</li>
            <li>4.打开试用，前台运行，真实体验3分钟</li>
        </ul>
    </div>

    <!-- 任务步骤 -->
    <div id="mission-btn">

      <template v-if="!data.keyWord">
        <flexbox :gutter="0" class="btn" @click="getMoney">
            <flexbox-item class="step-text">完成后点此领钱</flexbox-item>
        </flexbox>
      </template>  

      <template v-else>
        <flexbox :gutter="0" class="btn" @click="copyKey">
            <flexbox-item :span="2/7" class="step-text">步骤 1</flexbox-item>
            <flexbox-item :span="5/7">复制关键词：{{data.keyWord}}</flexbox-item>
        </flexbox>

        <flexbox :gutter="0" class="btn" @click="startMission">
            <flexbox-item :span="2/7" class="step-text">步骤 2</flexbox-item>
            <flexbox-item :span="5/7">马上开始任务</flexbox-item>
        </flexbox>

        <flexbox :gutter="0" class="btn" @click="getMoney">
            <flexbox-item :span="2/7" class="step-text">步骤 3</flexbox-item>
            <flexbox-item :span="5/7">完成后点此领钱</flexbox-item>
        </flexbox>
      </template>

    </div>
</section>

</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import sticky from "vux/src/components/sticky/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"

module.exports = {
    name: 'timedDetail',
    components: {
        "sticky": sticky,
        "x-header": xHeader,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem
    },
    route: {
        data: function(transition) {
            return this.$http.get(
                this.$root.CLIENT_URL.taskDetail,
                {
                    params:{
                        adid: this.$route.params.adid
                    }
                }).then(
                function (response) {
                    var getData = response.json(response.data);
                    if (getData.c === 0) {
                        this.data = getData.d
                        this.$root.endLoading(this.$loadingRouteData)
                    } else {
                        alert("c is -1")
                        // emit to popup fail stuff
                    }
                },
                function (response) {
                    alert("Opsss");
                    // emit to popup fail stuff
                });
        },
        waitForData: true
    },
    data:function () {
        return {
            data: {}
        }
    },
    methods: {
        copyKey: function(){
            this.$http.get(
                this.$root.CLIENT_URL.copy,
                {   parmas:{
                        keyword: this.data.keyWord
                    }
                }).then(
                function (response) {
                    var getData = response.json(response.data);
                    if (getData.c === 0) {
                        this.$root.toastStart("复制成功！")
                    }
                },
                function (response) {
                    alert("Opsss");
                    // emit to popup fail stuff
                });
        },
        startMission: function() {
            window.location.href="itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search"
        }
    },
    ready: function() {
        console.log(this.data)
    }
};
</script>