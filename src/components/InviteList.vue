<template>
<style>
#img_noship{display:none;margin:0 auto;margin-top:80px;width:60%}
  .date{color:#b7b7b7;margin-bottom:15px;text-align:center;font-size:12px}.div_award,.div_noaward{float:left;color:white;width:100px;height:80px;text-align:center;font-size:16px}.div_award p,.div_noaward p{vertical-align:middle;display:inline-block}.div_noaward{background:#5f5f5f}.div_info{background:white;color:#626262;overflow:hidden;height:80px;font-size:16px}.blackborder{border-left:2px dotted #5f5f5f}.bigger{font-size:28px;font-weight:bold}.div_info p{margin-top:14px;vertical-align:middle}.ghost{display:inline-block;width:1px;height:100%;vertical-align:middle}.exp{font-size:12px}.icons{float:left;margin-left:10px;margin-right:5px}.icons img{vertical-align:middle;width:15px}.infos{overflow:hidden}

    .hide{display: none}
</style>

<div id="inviteList">
  <sticky id="fuckme">
    <x-header id="fuckme"
          :left-options="{showBack: true, preventGoBack: true}"
          :right-options="{showMore: true}"
      >
      收徒列表
    </x-header>
  </sticky>

    <!-- <img src='//cdn.hongbaorili.com/wind/static/images/jingling/master/none.png' id='img_noship'/> -->

    <p :class="{ 'hide': data.lst }">Loading</p>
    <!-- 此处的v-if作用：重新编译　-->
    <scroller v-if="data.lst" :lock-x="true" :scrollbar-y="true" :height="listHeight" :use-pullup="true"  @pullup:loading="load"　:pullup-config="pullupConfig">

    <div>


      <template v-for="u in data.lst">
          <p class="date">{{ u["createtime"] }}</p>
          <div class="div_noaward primaryBgColor"><span class="ghost"></span><p class="text-award">
          <span v-if="u['chain_bonus'] == 0" class='bigger'>加油</span>
          <span v-else class='bigger'>+{{u["chain_bonus"]}}元</span>
          <br/><span class='exp'>经验值：{{u["exp"]}}</span></p></div>
          <div class="div_info blackborder">
              <p class="icons"><img src="//cdn.hongbaorili.com/wind/static/images/jingling/user/info/id.png" /></p><p class="infos">徒弟ID：{{u["tid"]}}</p>

              <p class="icons"><img src="//cdn.hongbaorili.com/wind/static/images/jingling/user/info/tel.png" /></p>

              <p class="infos" v-if="u['phone'] == 0">暂未绑定</p>

              <p class="infos" v-else>手机号：{{u["_phone"]}}</p>
          </div>
      </template>
      </div>
    </scroller>

    <p v-if="getNothing">没有数据</p>
</div>

</template>

<script>
import xHeader from 'vux/src/components/x-header'
import scroller from "vux/src/components/scroller"
import sticky from "vux/src/components/sticky/index.vue"

module.exports = {
    name: 'inviteList',
    components: {
      "scroller": scroller,
      "x-header": xHeader,
      "sticky": sticky
    },
    data:function () {
        return {
            data: {},
            pullupConfig: {
                content: "上拉刷新",
                downContent: "释放刷新",
                upContent: "上拉刷新",
                loadingContent: "loading"
            }
        }
    },
    methods: {
        copyLink: function() {
            alert("copying...");
        },
        load (uuid) {
            var _this = this;
            setTimeout(function(){
              _this.$http.post('/mock/invite/list').then(function (response) {
                   _this.data.lst = _this.data.lst.concat(response.data.lst);
               }, function (response) {
                   alert("Opsss");
               });
              _this.$broadcast('pullup:reset', uuid)
            }, 500);
        }
    },
    computed: {
      listHeight: function() {
       return document.documentElement.clientHeight - 46 + "px"
      }
    },
    ready: function () {
      var fuckme = document.querySelector("#fuckme");
      fuckme.ontouchmove = function(){
          return false;
      }
     this.$http.post('/mock/invite/list').then(function (response) {
          this.data = response.data;
      }, function (response) {
          alert("Opsss");
      });
    }
};
</script>