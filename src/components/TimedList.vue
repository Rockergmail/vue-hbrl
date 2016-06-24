
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
    
<div id="timed-list">
<sticky id="fuckme">
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:true}"
    >限时任务</x-header>
</sticky>

<scroller lock-x scrollbar-y :height="listHeight" v-ref:scroller use-pullup  @pullup:loading="load"　:pullup-config="pullupConfig">
<section id="list">
    <flexbox :gutter="0" class="mission-item" v-for="m in data.d" @click="goPlay(m.id, m)">
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
</section>
</scroller>

</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import sticky from "vux/src/components/sticky/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"
import scroller from "vux/src/components/scroller/index.vue"

module.exports = {
    name: 'timedList',
    components: {
        "sticky": sticky,
        "x-header": xHeader,
        "scroller": scroller,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem
    },
    route: {
        data: function(transition) {
            return this.loadData()
        }
    },
    data:function () {
        return {
            data: {d:[]},
            page: 1,
            amount: 10,
            flag: true, // 用于防止多次请求
            end: false  // 是否全部加载完毕
        }
    },
    methods: {
        changeType: function (type) {
            this.currentType = type;
        },
        load (uuid) {
            this.$broadcast('pullup:reset', uuid)
            this.loadData()
        },
        goPlay (id) {
            window.router.go({path: '/timedDetail?adid='+id})
        },
        loadData: function() {
            this.$root.type="timeout"

            if (!this.flag) {
                return false
            } else {
                this.flag = false
                return this.$http.get(this.$root.CLIENT_URL.getMissionList, {page: this.page}).then(
                    function (response) {
                        this.$root.endLoading(this.$loadingRouteData)
                        if (response.data.c === 0) {
                            this.data.d = this.data.d.concat(response.data.d)
                            this.$nextTick(function(){
                                this.$broadcast('scroller:reset', this.$refs.scroller.uuid)
                            this.page++;
                            this.flag = true
                            })
                        } else {
                            alert("c is -1")
                            // emit to popup fail stuff
                        }
                    },
                    function (response) {
                        alert("Opsss");
                        // emit to popup fail stuff
                    });
                }
        }
    },
    ready: function() {
        console.log(this.data)
    },
    computed: {
        listHeight: function () {
            return (document.documentElement.clientHeight - 46) + "px"
        }
    }
}
</script>