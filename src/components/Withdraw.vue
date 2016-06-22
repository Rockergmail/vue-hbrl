
<template>
<style scoped>
body{background: #F5F4F9}
.primaryColor{color:#dc5454;}


#userinfo .vux-flexbox .weui_cell{text-align: center;color:#7b7b7b;}

#panel-incomes{background: white;padding:20px 0px;overflow: hidden;margin:12px 0 24px;}
#panel-incomes{text-align: center;}
#panel-incomes img{width:32px;}
.money{font-size: 14px;color:#999;margin-top: 5px}
.weui_btn_disabled {
    color: white;
    background: #a0a0a0;
}
.weui_cells{margin-top:8px;}
</style>

<div id="withdraw">
    <x-header
        :left-options="{showBack:false, preventGoBack: true}"
        :right-options="{showMore:false,showRefresh:true,refreshLink: '/mock/withdraw'}"
    >红包日历</x-header>

    <section id="userinfo">
        <group>
            <cell is-link :link="{path: '/userinfo'}" class="vux-1px-b" style="padding:18px 16px;">
                <div slot="icon" style="margin-left:8px;">
                    <img src="./header-rili.jpg" style="border-radius:50%;float:left;width:64px;height:64px;">
                    <div style="float:left;margin-left:16px">
                        <p style="margin-top:28px;color:#636363;font-size:18px;">Rocker_Lau{{ data.nickname }}</p>
                        <p style="color:#7b7b7b;font-size:12px;opacity:0.6">邀请码：123456{{ data.tid }}</p>
                    </div>

                </div>
            </cell>
            <flexbox>
                <flexbox-item class="vux-1px-r">
                    <cell title="客服中心">
                        <img slot="before-title" width="20" style="display:inline;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                    </cell>
                </flexbox-item>
                <flexbox-item>
                    <cell title="切换账号">
                        <img slot="before-title" width="20" style="display:inline-block;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
                    </cell>
                </flexbox-item>
            </flexbox>
        </group>
    </section>

    <flexbox id="panel-incomes" class="vux-1px-b">
        <flexbox-item>
            <dl>
                <dt>
                    <img src="//cdn.hongbaorili.com/wind/static/images/jingling/exchange/2.png"/>
                </dt>
                <dd class="primaryColor">可提收入</dd>
                <dd class="money">{{ points }}元</dd>
            </dl>
        </flexbox-item>

        <flexbox-item>
            <dl>
                <dt>
                    <img src="//cdn.hongbaorili.com/wind/static/images/jingling/exchange/1.png"/>
                </dt>
                <template v-if="mode == 'exp'">
                    <dd id="awardmode" class="primaryColor">经验值</dd>
                    <dd class="money" id="exper">{{ expoints }}</dd>
                    </template>

                    <template v-else>
                    <dd id="awardmode" class="primaryColor">已提收入</dd>
                    <dd class="money" id="income2">{{ withdrawed }}元</dd>
                </template>
            </dl>
        </flexbox-item>

        <flexbox-item>
            <dl>
                <dt>
                    <img src="//cdn.hongbaorili.com/wind/static/images/jingling/exchange/2.png"/>
                </dt>
                <dd class="primaryColor">所有收入</dd>
                <dd class="money" id="income3">{{ total }}元</dd>
            </dl>
        </flexbox-item>

    </flexbox>

    <x-button text="申请提现" type="primary" v-if="status == true" class="primaryBgColor" @click="goWithdraw"></x-button>
    <x-button type="disabled" text="账号异常，请联系客服" v-else></x-button>

    <x-button text="兑换记录" type="primary" class="primaryBgColor"></x-button>

</div>

</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import xButton from 'vux/src/components/x-button'

module.exports = {
    name: "withdraw",
    route: {
        data: function(transition) {
            this.$root.endLoading(this.$loadingRouteData)
        }
    },
    data: function () {
        return {
            mode: "",
            points: 9999,
            expoints: 8888,
            withdrawed: 6666,
            total: 123456,
            status: false
        }
    },
    components: {
      "x-header": xHeader,
      "x-button": xButton,
      "group": Group,
      "cell": Cell,
      "flexbox": flexbox,
      "flexbox-item": flexboxItem
    },
    ready: function () {
       
    },
    methods:{
        goWithdraw: function(){
            alert("go withdraw");
        }
    }
};
</script>