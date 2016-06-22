
<template>
<style scoped>
    body{background:#F5F4F9;}
    .detail{background:#fff;border:1px solid #e6e6e6;width:90%;margin:15px auto 0;font-size:14px;overflow: hidden;}
    .detail dd,.detail dt{margin:0;padding:15px}
    .detail dd{padding-top:0;border-bottom:1px solid #e6e6e6}
    .detail dd:last-child{border:none}
    .right{float:right;color:#999}
    .left{color:#646462;font-weight: bold}
    #index .active{background: #ee544f;color:white;}
    #index p{border:1px solid #ee544f;border-left:none;}
    /*vux reset*/
    
</style>
    
<div id="timed-list">
<sticky id="fuckme">
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:true}"
    >限时任务</x-header>
</sticky>

<scroller lock-x scrollbar-y :height="listHeight" use-pullup  @pullup:loading="load"　:pullup-config="pullupConfig2">
    <flexbox class="item">
        <flexbox-item class="info-mission">
            <img :src="" class="icon-mission">
            <div class="text-mission">
                <p class="title-mission"></p>
                <p class="tag">
                    <span class="tag-mission"></span>
                    <span class="tag-mission">剩<span class="number-mission"></span>份</span>
                </p>
            </div>
        </flexbox-item>
        <flexbox-item class="number-point">
            <p class="on-mission">进行中...</p>
            <p class="point-mission"><span class="rmb"></span></p>
        </flexbox-item>
    </flexbox>
    
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
    data:function () {
        return {
            data: {},

        }
    },
    methods: {
        changeType: function (type) {
            this.currentType = type;
        },
        load (uuid) {
            console.log("fuck test");
            this.$broadcast('pullup:reset', uuid)
        }
    },
    ready: function() {

    },
    computed: {
        listHeight: function () {
            return (document.documentElement.clientHeight - 90) + "px"
        }
    }
};
</script>