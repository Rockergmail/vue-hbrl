
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
    /*vux reset*/
    
</style>
    
<div id="taskList">
<sticky id="fuckme">
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:true}"
    >限时任务</x-header>
</sticky>

<div v-if="nomission">暂时没有任务哦～</div>

<scroller lock-x scrollbar-y :height="listHeight" v-ref:scroller use-pullup  @pullup:loading="load" :pullup-status.sync="pullupStatus">
<section id="list">
    <!-- 普通任务 & 深度任务 -->
    <template v-if="tasktype != 1">
    <flexbox :gutter="0" class="mission-item" v-for="m in data.d" @click="goPlay(m.id)">
        <flexbox-item :span="2/10" class="item-icon">
            <img :src="m.iconUrl" width="80%">
        </flexbox-item>

        <flexbox-item :span="5/10" class="item-text">
            <div class="mission-info">
                <p class="mission-title">{{m.name}}</p>
                <p class="tag">
                    <span class="mission-tag" v-if="m.isfree">免费</span>
                    <span class="mission-tag" v-else>付费</span>
                </p>
            </div>
            <i class="dot-top"></i>
            <i class="dot-bottom"></i>
        </flexbox-item>

        <flexbox-item :span="3/10" class="item-status">
            <p class="mission-point" v-else><span class="rmb">￥</span>{{m.point/100}}</p>
        </flexbox-item>
    </flexbox>
    </template>

    <!-- 限时任务 -->
    <template v-else>
    <flexbox :gutter="0" class="mission-item" v-for="m in data.d" @click="goPlay(m.id)">
        <flexbox-item :span="2/10" class="item-icon">
            <img :src="m.iconUrl" width="80%">
        </flexbox-item>

        <flexbox-item :span="5/10" class="item-text">
            <div class="mission-info">
                <p class="mission-title">{{m.name}}</p>
                <p class="tag">
                    <span class="mission-tag" v-if="m.isfree">免费</span>
                    <span class="mission-tag" v-else>付费</span>

                    <span class="mission-tag">剩 <span class="mission-rest">{{m.remainNumber}}</span> 份</span>
                </p>
            </div>
            <i class="dot-top"></i>
            <i class="dot-bottom"></i>
        </flexbox-item>

        <flexbox-item :span="3/10" class="item-status">
            <p class="mission-on" v-if="m.status">进行中...</p>
            <p class="mission-point" v-else><span class="rmb">￥</span>{{m.point/100}}</p>
        </flexbox-item>
    </flexbox>
    </template>
</section>

<!--pullup slot-->
<div v-show="data.d && !loadall" slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; line-height:40px; bottom: -40px; text-align: center;">
  <span v-show="pullupStatus === 'default' || pullupStatus === 'up'">上拉加载更多</span>
  <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
</div>

</scroller>

</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import sticky from "vux/src/components/sticky/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"
import scroller from "vux/src/components/scroller/index.vue"
import spinner from "vux/src/components/spinner"
import toast from 'vux/src/components/toast'

module.exports = {
    name: 'taskList',
    components: {
        "sticky": sticky,
        "x-header": xHeader,
        "scroller": scroller,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem,
        "spinner": spinner,
        "toast": toast
    },
    route: {
        data: function(transition) {
            return this.getTaskList(transition)
        },
        waitForData: true
    },
    data:function () {
        return {
            data: {d:[]},
            page: 1,
            amount: 10,
            tasktype: this.$route.params.tasktype,
            flag: true, // 用于防止请求过程中重复请求
            loadall: false, // 是否加载完毕
            nomission: false, // 没有任务
            pullupStatus: 'default',
        }
    },
    methods: {
        changeType: function (type) {
            this.currentType = type;
        },
        load (uuid) {
            // 请求中，不可继续请求
            if (!this.flag) {
                return false
            // 请求完毕，可以继续请求
            } else {
                this.flag = false
                this.getTaskList(uuid)
            }
        },
        goPlay (id) {

            if (this.tasktype == 1) {
                this.$root.toastStart("抢任务中...");
            }
            this.$http.get(
                this.$root.CLIENT_URL.snatchTask,
                {
                    params:{
                        adid: id,
                    }
                }).then(
                function (response) {
                    var getData = response.json(response.data);
                    if (this.tasktype == 1) {
                        this.$root.toastStart("成功抢到任务！跳转中...");
                    }
                    if (getData.c === 0) {
                       this.$router.go(
                        { 
                            name: 'detail',
                            params: {
                                adid: id
                            }
                        }) 
                    }
                },
                function (response) {
                    this.$root.toastStart("error: 宝宝不开心");
                });
            
        },
        getTaskList: function(transition) {
            return this.$http.get(
                this.$root.CLIENT_URL.taskList,
                {
                    params:{
                        page: this.page,
                        type: this.tasktype,
                        // amount: this.amount
                        // type为0是普通任务，1为限时任务，2为深度任务
                    }
                    // ,
                    // _timeout: 500
                }).then(
                function (response) {
                    var getData = response.json(response.data)
                    this.$root.endLoading(this.$loadingRouteData)
                    // 返回数据状态正常
                    if (getData.c === 0) {
                        // 有任务数据返回
                        if (getData.d.length != 0) {
                            this.data.d = this.data.d.concat(getData.d)
                            this.$nextTick(function(){
                                this.$broadcast('scroller:reset', this.$refs.scroller.uuid)
                            this.page++;
                            })
                        // 无任务数据返回
                        } else {
                            if (this.page == 1) {
                                // 没有任务的提示
                                this.nomission = true
                            } else {
                                // 任务加载完毕的提示
                                this.loadall = true;
                                this.$root.toastStart("加载完毕");
                            }
                        }
                    // 返回数据状态不正常
                    } else {
                        this.$root.toastStart("c!=0:一大波用户在涌入，请稍后再试！");
                        // this.$root.giveUpTransition(transition)
                    }
                    this.flag = true;
                    this.$broadcast('pullup:reset', this.$refs.scroller.uuid);
                },
                function (response) {
                    // this.$root.giveUpTransition(transition)
                    if (response.statusText="request timeout") {
                        this.$root.toastStart("timeout:一大波用户在涌入，请稍后再试！");
                    } else {
                        this.$root.toastStart("error:一大波用户在涌入，请稍后再试！");
                    }
                    this.$broadcast('pullup:reset', this.$refs.scroller.uuid)
                    this.flag = true
                });
        }
    },
    ready: function() {
    },
    computed: {
        listHeight: function () {
            return (document.documentElement.clientHeight - 46) + "px"
        }
    }
}
</script>