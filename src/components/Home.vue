

<template>
<style scoped>
    html,body{background: #F5F4F9;}
    
    /*section board*/
    #section-board{background: #DD5555;color:white;padding:1.0rem 1.25rem;}
    #text-income{float:left;}
    #text-invite{float:right;color:#F1BDBD;}
    #data-total{margin:16px 

        0;display:block;font-size: 42px;height:63px;}

    /*section withdraw*/
    #section-withdraw{clear:both;border-top:2px solid #DE4346;padding:24px 0 4px;}
    #btn-withdraw{float:right;color:white;font-size:1.0rem;text-align:center;border:1px solid white;border-radius: 0.375rem;padding:0.5rem 1.25rem;}
    .text-money{color:#F1BDBD;font-size: 0.875rem}


    /*section menu*/
    #section-menu{background: white;color:black;overflow: hidden;margin-top:6px;}
    .item{display: block;padding:;font-size: 14px;color:#494949;padding:6px 0;}
    .item dt{padding:50% 50% 0 0;position: relative;}
    
    .container-img{min-height:40px;min-width:76px;}
    .menu-icon{width:50%;position: absolute;left:0;right:0;margin:0 auto;top:0;}
    .menu0,.menu2,.menu3,.menu1{border-top:0;}
    .menu3,.menu7{border-right:0;}
</style>
<div id="home">

    <x-header
        :left-options="{showBack:false, preventGoBack: true}"
        :right-options="{showMore:false,showRefresh:true}"
    >红包日历</x-header>

    <div id="main">
    	<section id="section-board">
            <p id="text-income">
                <p id="text-invite">邀请码： {{ userData['inviteCode'] }}</p>

                <p id="text-total">累计收益（元）</p>
                <countup v-if="userData.total" id="data-total" :end-val="userData.total" :decimals="2"></countup>

                <p id="data-total" v-else></p>
            </p>

            <section id="section-withdraw">
                <a id="btn-withdraw" v-link="{path: '/withdraw'}">立即提现</a>
                
                <p class="text-money">当前余额： {{ userData['balance'] }}</p>
                <p class="text-money">今日收入： {{ userData['todayIncome'] }}</p>
            </section>
    	</section>

    	<section id="section-menu">
            <flexbox :gutter="0" style="text-align:center">
              <flexbox-item 
                :span="0.25"
                class="vux-1px-t vux-1px-r menu{{index}}"
                v-for="(index, menu) in menus">
                <a class="item" v-link="menu.path">
                    <dl>
                        <dt>
                            <div class="img-placeholder"></div>
                            <img :src="menu.pic" class="menu-icon">
                        </dt>
                        <dd class="menu-title">
                            {{ menu.title }}
                        </dd>
                    </dl>
                </a>
              </flexbox-item>
            </flexbox>
    	</section>
    </div>
</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"
import countup from "vux/src/components/countup/index.vue"

module.exports = {
    name: "home",
    components: {
        "x-header": xHeader,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem,
        "countup": countup
    },
    route: {
        data: function(transition) {
            this.$root.endLoading(this.$loadingRouteData);
        }
    },
    data: function () {
        return {
            userData: {},
            menus: [{
                    path: "/taskList/1",
                    pic: "http://cdn.hongbaorili.com/wind/static/images/icon/pro.png",
                    title: "限时任务"
                }, {
                    path: "/taskList/2",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "深度任务"
                }, {
                    path: "/taskList/0",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "联盟任务"
                }, {
                    path: "/invite",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "邀请奖励"
                }, {
                    path: "/income",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "收入明细"
                }
                // , {
                //     path: "/apprentice",
                //     pic: "http://www.iconpng.com/download/png/100970",
                //     title: "徒弟列表"
                // }
                // , {
                //     path: "/pocketmoney",
                //     pic: "http://www.iconpng.com/download/png/100970",
                //     title: "每日红包"
                // }, {
                //     path: "/showoff",
                //     pic: "http://www.iconpng.com/download/png/100970",
                //     title: "激情晒单"
                // }, {
                //     path: "/userinfo",
                //     pic: "http://www.iconpng.com/download/png/100970",
                //     title: "个人中心"
                // }
                ]
        }
    },
    events: {
        "loginSuccess": function(val) {
            if (val) {
                this.$root.getData(this, this.$root.CLIENT_URL.home);
            }
        }
    },
    ready: function () {
        // 这里要用ready而不是route.userData，是因为要先检测到它是否打开小助手来登陆
    }
}
</script>