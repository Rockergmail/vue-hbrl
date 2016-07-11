<style scoped>
	#invite{background:#f5f5f5}
	#board-info{background: #ee544f;padding:15px}
	.board{background: white;border-radius:6px;text-align: center;color: #666;}
	.board-count{margin-top:8px;height:84px}
	.board-total{
		padding: 15px 0px;
	    overflow: hidden;
	}
    .board-count .tips{font-size:14px;color:#999}
    #div_chars{padding:16px;color:#939393;background: white;font-size:12px;}
	.points{color:red;font-weight:700;font-size:2em;}
    #menus{
    	margin-top:16px;
        background: white;
		text-align: center;	 
		font-size: 14px;
    }
    #menus dl{padding:10px 0;}
    #menus dd{margin-top:6px;}
    .menu2{border-right:none;}

	.item{background: white;margin-top:12px;}
	
	/*vux reset*/
	.cell{color:#999;}
</style>

<template>

<div id="invite">

	<div id="board-info">
	    <flexbox :gutter="0" class="board board-total">
	        <flexbox-item>累计收益（元）</flexbox-item>
	        <flexbox-item class="points">{{ data['inviteIncome'] }}元</flexbox-item>
	    </flexbox>

	    <flexbox :gutter="0" class="board board-count">
	        <flexbox-item class="vux-1px-r">徒弟 {{ data['cson1'] }} 个<br><span class="tips">10% 收入奖励</span></flexbox-item>
	        <flexbox-item>徒孙 {{ data['cson2'] }} 个<br><span class="tips">5% 收入奖励</span></flexbox-item>
	    </flexbox>  
    </div>

	<!-- menus -->
    <flexbox :gutter="0" id="menus">
    	<flexbox-item :span="0.333333333" v-for="(index,menu) in menus" class="menu{{index}} vux-1px-t vux-1px-r vux-1px-b">
    		<a v-link="menu.link">
		        <dl>
		            <dt><img width="33%" :src="menu.iconLink"></dt>
		            <dd>{{ menu.title }}</dd>
		        </dl>
            </a>
        </flexbox-item>
    </flexbox>
  
	<group class="cell">
		<cell title="查看徒弟列表" is-link :link="{path:'/invite/list'}"></cell>
	</group>

	<group class="cell">
		<cell class="vux-1px-b" title="收徒小贴士" is-link :link="{path:'/invite/list'}"><span style="color:#f4928d;">邀请说明</span></cell>

	    <div id='div_chars'>
	        <div style="line-height:1.3em;">
	            <p style="color:red"><span style="font-size:14px;font-weight:bold">收徒重大更新：</span><br>以上三种收徒，无需填写邀请码即是你的徒弟！</p><br>
	            <p>收徒奖励=等级奖励+分成奖励</p><br>
	            <p>等级奖励：<br/>徒弟每做任务赚10元(1000经验值),奖励师傅1元,无上限</p><br>
	            <p>分成奖励：<br/>徒弟永久10%任务收益+徒孙永久5%任务收益</p>
	        </div>
		</div>
	</group>
</template>

<script>
import flexbox from "vux/src/components/flexbox/index.vue"
import flexboxItem from "vux/src/components/flexbox-item/index.vue"
import Cell from 'vux/src/components/cell'
import Group from 'vux/src/components/group'

module.exports = {
    name: 'Invite',
	components: {
		"flexbox": flexbox,
		"flexbox-item": flexboxItem,
		"cell": Cell,
		"group": Group
	},
	data:function(){
		return {
			data: {},
			menus: [
				{
					link: '/invite/share',
					iconLink: "//cdn.hongbaorili.com/wind/static/images/master/showoff.png",
					title: "晒单收徒"
				},

				{
					link: '/invite/qrcode',
					iconLink: "//cdn.hongbaorili.com/wind/static/images/master/qrcode.png",
					title: "扫描收徒"
				},

				{
					link: '/invite/link',
					iconLink: "//cdn.hongbaorili.com/wind/static/images/master/link.png",
					title: "链接收徒"
				}
			]
		}
	},
	ready: function () {
	    this.$http.get('/mock/invite').then(function (response) {
	        this.data = response.data;
	        console.log(response.data.shareUrl)
	    }, function (response) {
	        alert("Opsss");
	    });
	}
};
</script>