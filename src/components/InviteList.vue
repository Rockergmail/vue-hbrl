<template>
<style>
#img_noship{display:none;margin:0 auto;margin-top:80px;width:60%}
  .date{color:#b7b7b7;margin-bottom:15px;text-align:center;font-size:12px}.div_award,.div_noaward{float:left;color:white;width:100px;height:80px;text-align:center;font-size:16px}.div_award p,.div_noaward p{vertical-align:middle;display:inline-block}.div_noaward{background:#5f5f5f}.div_info{background:white;color:#626262;overflow:hidden;height:80px;font-size:16px}.blackborder{border-left:2px dotted #5f5f5f}.bigger{font-size:28px;font-weight:bold}.div_info p{margin-top:14px;vertical-align:middle}.ghost{display:inline-block;width:1px;height:100%;vertical-align:middle}.exp{font-size:12px}.icons{float:left;margin-left:10px;margin-right:5px}.icons img{vertical-align:middle;width:15px}.infos{overflow:hidden}

    [v-cloak]{display: none}
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

    <!-- <p :class="{ 'hide': data.lst }">Loading</p> -->

    <scroller lock-x scrollbar-y :height="listHeight" v-ref:scroller use-pullup  @pullup:loading="load" :pullup-status.sync="pullupStatus">
      <!--content slot-->
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
      <!--pullup slot-->
      <div v-show="data.lst" slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; line-height:40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default' || pullupStatus === 'up'">上拉加载更多</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>

    <p v-if="getNothing">没有数据</p>
</div>

</template>

<script>
import xHeader from 'vux/src/components/x-header'
import scroller from "vux/src/components/scroller"
import sticky from "vux/src/components/sticky/index.vue"
import spinner from "vux/src/components/spinner"

module.exports = {
    name: 'inviteList',
    components: {
      "scroller": scroller,
      "x-header": xHeader,
      "sticky": sticky,
      "spinner": spinner
    },
    data:function () {
        return {
            data: {},
            pullupStatus: 'default'
        }
    },
    route: {
        data: function(transition) {
            return this.$http.post('/mock/invite/list').then(function (response) {
                this.data = response.data
                this.$root.endLoading(this.$loadingRouteData)
                this.$nextTick(function(){
                  this.$broadcast('scroller:reset', this.$refs.scroller.uuid)
                })
             }, function (response) {
                 alert("Opsss");
             });
        }
    },
    methods: {
        copyLink: function() {
            alert("copying...");
        },
        load (uuid) {
          var _this = this;
          setTimeout(function(){
            _this.$http.post('/mock/invite/list', {timeout: 1000}).then(function (response) {
                console.log(response.statusText)
                 _this.data.lst = _this.data.lst.concat(response.data.lst);
                 _this.$broadcast('pullup:reset', uuid)
                 _this.$nextTick(function(){
                  _this.$broadcast('scroller:reset', uuid)
              })
             }, function (response) {
                 alert(response.statusText);
             });
          }, 600);
        }
    },
    computed: {
      listHeight: function() {
       return document.documentElement.clientHeight - 46 + "px"
      }
    },
    ready: function () {
    }
};
</script>