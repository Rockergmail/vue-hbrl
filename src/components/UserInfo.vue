<template>

<div id="personal">

  <x-header
        :left-options="{showBack: true, preventGoBack: true}"
        :right-options="{showMore: true}"
    >
    个人信息
  </x-header>

  <group>
    <x-input title="姓名" placeholder="请输入姓名" is-type="china-name" :value.sync="data.nickname" :show-clear="false"></x-input>
    
    <x-input title="email" placeholder="请输入youxiang" is-type="email" :show-clear="false" :value.sync="data.email"></x-input>

    <selector title="gender" :options="genderList" :value.sync="data.gender" v-if="data.gender"></selector>

    <selector title="gender" :options="genderList" v-else></selector>

    <cell title="wechat" is-link :link="{path:'/'}"></cell>

  </group>
  

  <x-button text="提交" type="primary"></x-button>

  
    
</div>

</template>

<script>
import xHeader from 'vux/src/components/x-header'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import xButton from 'vux/src/components/x-button'
import xInput from 'vux/src/components/x-input'
import selector from 'vux/src/components/selector'

module.exports = {
    name: "home",
    data: function () {
        return {
            data: { },
            genderList: ['Male', "Female"]
        }
    },
    route: {
        data: function(transition){
            return this.$http.post('/mock/userinfo').then(function (response) {
                this.$root.endLoading(this.$loadingRouteData)
                return {data: response.data}
              }, 
              function (response) {
                  alert("Opsss");
              });
        },
        waitForData: true
    },
    components: {
      "x-header": xHeader,
      "x-input": xInput,
      "x-button": xButton,
      "group": Group,
      "cell": Cell,
      "selector": selector
    },
    methods: {
        submitData: function () {
            // using vue-resource
        }, 
        timing: function () {
            // daojishi
        }
    }
    // ,
    // ready: function () {
    //     this.$http.post('/mock/userinfo').then(function (response) {
    //         this.data = response.data;
    //         console.log(this.data)
    //     }, function (response) {
    //         alert("Opsss");
    //     });
    // }
};
</script>