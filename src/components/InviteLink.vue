<style scoped>
/*    html,body{background: white;height:100%;word-wrap: break-word;}
    #inviteLink{text-align: center;}
    #wrapper{padding-top:36px;min-height: 100%}
    #data,#linkbox,#copy,#tips{width:80%;margin:0 auto;}
    #data{border:1px dashed #d2d2d2;}
    dl{overflow: hidden;padding:10px 0;font-size:14px;}
    dt,dd{float: left;}
    dt{width:40%;}
    dd{margin-top:5px;width:60%;}
    dd p{line-height: 20px;white-space:nowrap;-webkit-text-overflow:ellipsis;}
    #linkbox{clear:both; background: #f6f6f6;border:1px solid #d2d2d2;margin-top:16px;text-align: left;padding: 12px 12px 20px;}
    #copy{color:white;background: #ffda73;margin-top:12px;padding:6px 0;border-radius: 5px;}
    #tips{margin-top:28px;padding-bottom:38px;}
    #icon{border-radius: 50%}
    #url{color:#aeaeae;word-wrap: break-word;line-height: 1em;width:100%;}
    .box{display:-webkit-box;display:box}
    .box.bac{-webkit-box-align:center;box-align:center}
    .box.bpc{-webkit-box-pack:center;box-pack:center}
    .task-key-box {
            height: initial;
            line-height: initial;
        }
    .task-key-img,.task-key-shadow{position:absolute;top:0}
    .task-key-img{-webkit-user-select:none;z-index:2;width:100%;height:100%;left:0;opacity:0}
    .task-key-shadow{display:block;z-index:3;width:100%;height:100%;left:0}
    .task-key-box{position:relative;display:block;height:56px;line-height:52px;font-size:18px;border-radius:5px}
    .task-key-box .db{display:block overflow: hidden;white-space:nowrap}
    .task-key-container{-webkit-user-select:initial}
    .task-key-container{position:relative;display:block;text-align:center}
    .dib{display: inline-block;}
    .fs-15{font-size: 15px;}
*/
    </style>

<template>


<div id="inviteLink">
    
    <dl id="data">
        <dt><img id="icon" src="//cdn.hongbaorili.com/wind/static/images/master/icon.png" width="50%"></dt>
        <dd>
            <p>昵称：{{ data['nickname'] }}</p>
            <p>ID：{{ data['tid'] }}</p>
        </dd>
    </dl>

    <div class="task-key-container mt30" id="linkbox">

        <!-- 这里用v-if是因为要重新编译img这个标签，是的title属性有效
        -->

        <img v-if="data.url" class="task-key-img" :title="data.url" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJCAYAAAAGuM1UAAAAH0lEQVR42mNgoDnQ13f7TwiTpIkkm0hyHkl+YhhQAABcfyjsqSyTLgAAAABJRU5ErkJggg==">
        <div class="task-key-shadow"></div>
        <div class="task-key-box box bac bpc tac">
            <span class="dib fs-15" id="url">{{ data['url'] }}</span>
        </div>
    </div>

    <div id="copy" style="font-size:20px" @click="copyLink">复制链接</div>
    <div id="tips" style="font-size:14px;font-weight:bold">小贴士：<br>可将链接发布到你想发布的任何地方（贴吧，微博，微信等）</div>
    
    <img width="320px" src="//cdn.hongbaorili.com/wind/static/images/master/ljbg.jpg">
</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"

module.exports = {
    name: 'inviteLink',
    components: {
        "x-header": xHeader,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem
    },
    data:function () {
        return {
            data:{}
        }
    },
    methods: {
        copyLink: function() {
            alert("copying...");
        }
    },
    created: function () {
        this.$http.get('/mock/invite/link').then(function (response) {
            this.data = response.data;
        }, function (response) {
            alert("Opsss");
        });
    }
};
</script>