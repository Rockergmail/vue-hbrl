
<template>
<style scoped>
    body{background:#f5f5f5;color:#999}
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
    
<div id="income">
<sticky id="fuckme">
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:true}"
    >收入列表</x-header>

    <tab>
        <tab-item selected>全部</tab-item>
        <tab-item>任务</tab-item>
        <tab-item>邀请</tab-item>
    </tab>

</sticky>

<scroller lock-x scrollbar-y :height="listHeight" use-pullup  @pullup:loading="load"　:pullup-config="pullupConfig2">

    <dl class="detail" v-show="currentType === 'all'">
        <template v-for="i in alldata">
            <dt>
                <span class="left">{{i["tag"]}}</span>
                <span class="right">{{i["createtime"]}}</span>
            </dt>
            <dd>{{i["note"]}}</dd>
        </template>
    </dl>

    <dl class="detail" v-show="currentType === 'task'">
        <template v-for="i in taskdata">
            <dt>
                <span class="left">{{i["tag"]}}</span>
                <span class="right">{{i["createtime"]}}</span>
            </dt>
            <dd>{{i["note"]}}</dd>
        </template>
    </dl>

    <dl class="detail" v-show="currentType === 'invite'">
        <template v-for="i in invitedata">
            <dt>
                <span class="left">{{i["tag"]}}</span>
                <span class="right">{{i["createtime"]}}</span>
            </dt>
            <dd>{{i["note"]}}</dd>
        </template>
    </dl>
</scroller>

</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import sticky from "vux/src/components/sticky/index.vue"
import tab from "vux/src/components/tab/tab.vue"
import tabItem from "vux/src/components/tab/tab-item.vue"
import scroller from "vux/src/components/scroller/index.vue"

module.exports = {
    name: 'income',
    components: {
        "sticky": sticky,
        "x-header": xHeader,
        "tab": tab,
        "tab-item": tabItem,
        "scroller": scroller
    },
    data:function () {
        return {
            currentType: 'all',
            itemType: ["all", "task", "invite"],
            alldata: [{"note": "\u6652\u5355\u5956\u52b1:1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:54:04"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:52:44"}, {"note": "\u6652\u5355\u5956\u52b1:1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:46:29"}, {"note": "\u62a2\u5230\u6bcf\u65e5\u7ea2\u53050.01\u5143", "tag": "\u6bcf\u65e5\u7ea2\u5305", "createtime": "2016-05-06 15:03:19"}, {"note": "\u62a2\u5230\u6bcf\u65e5\u7ea2\u53050.01\u5143", "tag": "\u6bcf\u65e5\u7ea2\u5305", "createtime": "2016-05-05 15:47:13"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.5\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-04 11:29:59"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.5\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-04 11:13:58"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.5\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-04 11:06:45"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.5\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-03 19:31:41"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.5\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-03 18:02:49"}],
            taskdata: [{"note": "\u5b8c\u6210\u7b7e\u5230\u4efb\u52a1\u6bcf\u5929\u6d3e, \u83b7\u5f970.04\u5143", "tag": "\u7b7e\u5230\u4efb\u52a1", "createtime": "2016-05-11 09:55:14"}, {"note": "\u5b8c\u6210\u4e0b\u8f7d\u4efb\u52a1\u7f8e\u4e3d\u9605\u8bfb, \u83b7\u5f970.24\u5143", "tag": "\u4e0b\u8f7d\u4efb\u52a1", "createtime": "2016-05-11 09:53:41"}, {"note": "\u5b8c\u6210\u4e0b\u8f7d\u4efb\u52a1\u8eba\u8d5a, \u83b7\u5f970.16\u5143", "tag": "\u4e0b\u8f7d\u4efb\u52a1", "createtime": "2016-05-10 17:19:52"}, {"note": "\u5b8c\u6210\u4e0b\u8f7d\u4efb\u52a1\u9014\u725b\u65c5\u6e38, \u83b7\u5f970.16\u5143", "tag": "\u4e0b\u8f7d\u4efb\u52a1", "createtime": "2016-05-10 17:16:37"}, {"note": "\u5b8c\u6210\u4e0b\u8f7d\u4efb\u52a1\u817e\u8baf\u65b0\u95fb, \u83b7\u5f970.24\u5143", "tag": "\u4e0b\u8f7d\u4efb\u52a1", "createtime": "2016-05-03 08:11:50"}],
            invitedata: [{"note": "\u6652\u5355\u5956\u52b1:1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:54:04"}, {"note": "\u5fae\u4fe1\u7ed1\u5b9a\u5956\u52b1\uff1a0.1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:52:44"}, {"note": "\u6652\u5355\u5956\u52b1:1\u5143", "tag": "\u7cfb\u7edf\u901a\u77e5", "createtime": "2016-05-06 17:46:29"}, {"note": "\u62a2\u5230\u6bcf\u65e5\u7ea2\u53050.01\u5143", "tag": "\u6bcf\u65e5\u7ea2\u5305", "createtime": "2016-05-06 15:03:19"}],
            pullupConfig2: {
                content: "上拉刷新",
                pullupStatus: 'default',
                downContent: "释放刷新",
                upContent: "上拉刷新",
                loadingContent: "loading"
            }
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
        var fuckme = document.querySelector("#fuckme");
        fuckme.ontouchmove = function(){
            return false;
        }
    },
    computed: {
        listHeight: function () {
            return (document.documentElement.clientHeight - 90) + "px"
        }
    }
};
</script>