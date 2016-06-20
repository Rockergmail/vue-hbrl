

<template>
<style scoped>
    html,body{background: #F5F4F9;font-size:16px;}
    
    /*section board*/
    #section-board{background: #DD5555;color:white;padding:1.0rem 1.25rem;}
    #text-income{float:left;}
    #text-invite{float:right;color:#F1BDBD;}
    #data-total{margin:16px 0;display:block;font-size: 42px;height:63px;}

    /*section withdraw*/
    #section-withdraw{clear:both;border-top:2px solid #DE4346;padding:24px 0 4px;}
    #btn-withdraw{float:right;color:white;font-size:1.0rem;text-align:center;border:1px solid white;border-radius: 0.375rem;padding:0.5rem 1.25rem;}
    .text-money{color:#F1BDBD;font-size: 0.875rem}


    /*section menu*/
    #section-menu{background: white;color:black;overflow: hidden;margin-top:6px;}
    .item{display: block;padding:;font-size: 14px;color:#494949;padding:6px 0;}
    
    .menu-icon{width:50%;height:50%;}
    .menu0,.menu2,.menu3,.menu1{border-top:0;}
    .menu3,.menu7{border-right:0;}
</style>
<div id="home">

    <x-header
        :left-options="{showBack:false, preventGoBack: true}"
        :right-options="{showMore:false,showRefresh:true,refreshLink: '/mock/home'}"
    >红包日历</x-header>

    <div id="main">
    	<section id="section-board">
            <p id="text-income">
                <p id="text-invite">邀请码： {{ data['inviteCode'] }}</p>

                <p id="text-total">累计收益（元）</p>
                <countup v-if="data.total" id="data-total" :end-val="data.total" :decimals="2"></countup>

                <p id="data-total" v-else></p>
            </p>

            <section id="section-withdraw">
                <a id="btn-withdraw" v-link="{path: '/withdraw'}">立即提现</a>
                
                <p class="text-money">当前余额： {{ data['balance'] }}</p>
                <p class="text-money">今日收入： {{ data['todayIncome'] }}</p>
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
// require("vux/src/components/x-header");
// require("vux/src/components/flexbox/index.vue");

module.exports = {
    name: "home",
    components: {
        "x-header": xHeader,
        "flexbox": flexbox,
        "flexbox-item": flexboxItem,
        "countup": countup
    },
    // route: {  
    //     data: function (transition) {

    //         this.$root.showLoading = false
    //         this.$root.opacity = 0
    //         this.$root.percent = 100
            
    //         setTimeout(
    //          function(){
    //              this.$root.showProgress = false
    //              this.$root.opacity = 1
    //              this.$root.percent = 0
    //          }, 1000)

    //         console.log("home");
    //       }  
    // },
    route: {
        waitForData: true
    },
    data: function () {
        return {
            data: {},
            menus: [{
                    path: "/limit",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "限时任务"
                }, {
                    path: "/deep",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "深度任务"
                }, {
                    path: "/invite",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "邀请奖励"
                }, {
                    path: "/apprentice",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "徒弟列表"
                }, {
                    path: "/income",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "收入明细"
                }, {
                    path: "/pocketmoney",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "每日红包"
                }, {
                    path: "/showoff",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "激情晒单"
                }, {
                    path: "/userinfo",
                    pic: "http://www.iconpng.com/download/png/100970",
                    title: "个人中心"
                }]
        }
    },
    ready: function () {
        this.$http.get('/mock/home').then(function (response) {
            this.data = response.data
        }, function (response) {
            alert("Opsss");
        });
        // console.log(this.$root.route.data)
    }
};
</script>
