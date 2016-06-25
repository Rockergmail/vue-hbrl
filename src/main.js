var Vue = require("vue"),
	VueRouter = require("vue-router"),
	VueResource = require("vue-resource"),
	Mock = require("mockjs"),
	md5 = require("md5");

import app from "./components/App"
import Home from './components/Home'
import progress from "vux/src/components/progress"
import loading from "vux/src/components/loading"
import xPopup from "./components/common/xPopup"
import xToast from "./components/common/xToast"

	// Debug mode
	Vue.config.debug = true;
	// 使用vue-router && vue-resource
	Vue.use(VueRouter);
	Vue.use(VueResource);


var router = new VueRouter();

	// 注册组件
	// Vue.component("x-header", xHeader);
	Vue.component("loading", loading);
	Vue.component("progress", progress);
	Vue.component('x-popup', xPopup);
	Vue.component('x-toast', xToast);

	// 路由表
	router.map({
		// 首页
		'/': {
			component: Vue.extend(Home)
		},
		// 限时任务
		'/timedList': {
			component: function(resolve){
				require(['./components/TimedList.vue'], resolve);
			}
		},
		'/timedDetail': {
			component: function(resolve){
				require(['./components/TimedDetail.vue'], resolve);
			}
		},
		// 个人信息
		'/userinfo': {
			component: function(resolve){
				require(['./components/UserInfo.vue'], resolve);
			}
		},
		// 提现中心
		'/withdraw': {
			component: function(resolve){
				require(['./components/Withdraw.vue'], resolve);
			}
		},
		// '/pocketmoney': {
		// 	component: function(resolve){
		// 		require(['./components/PocketMoney.vue'], resolve);
		// 	}
		// },
		// 邀请奖励
		'/invite': {
			component: function(resolve){
				require(['./components/Invite.vue'], resolve);
			}
		},
		'/invite/qrcode': {
			component: function(resolve){
				require(['./components/InviteQrcode.vue'], resolve);
			}
		},
		'/invite/link': {
			component: function(resolve){
				require(['./components/InviteLink.vue'], resolve);
			}
		},
		'/invite/list': {
			component: function(resolve){
				require(['./components/InviteList.vue'], resolve);
			}
		},
		// 收入明细
		'/income': {
			component: function(resolve){
				require(['./components/Income.vue'], resolve);
			}
		}
	});


	// 路由勾子canUse之前
	router.beforeEach(function(transition){
		router.app.resetLoading()
	    transition.next()
	})

	// 路由勾子activate之前
	router.afterEach(function(transition){
		router.app.startLoading()
	})

	// 启动路由
	router.start(app, "#app");
	window.router = router;

	// Mock.js
	var Random = Mock.Random;
	// Random.extend({
	// 	inviteCode: function(data) {
	// 		return this.natural(100000, 999999)
	// 	// }),
	// 	})

	// 	// myFloat: function() {
	// 	// 	return Random.float(0, 999, 0, 2),
	// 	// }
	// })

	Mock.setup({
		timeout: 3000
	})

	// home
	Mock.mock('/mock/home', {
		inviteCode: Random.natural(100000, 999999),
		total: Random.float(0, 999, 0, 2),
		balance: Random.float(0, 999, 0, 2),
		todayIncome: Random.float(0, 999, 0, 2)
	});
	
	// invite
	Mock.mock('/mock/invite', {
		inviteIncome: Random.float(0, 999, 0, 2),
		cson1: Random.integer(0,99),
		cson2: Random.integer(0,99),
		shareUrl: Random.url('http'),
	    shareThumbnail: Random.string(5,10),
	    shareTitle: Random.string(5,10),
	    shareSubtitle: Random.string(5,10)
	});

	// inviteLink
	Mock.mock('/mock/invite/link', {
		nickname: Random.string(5,10),
		tid: Random.natural(100000, 999999),
		url: Random.url('http')
	})

	// inviteList
	Mock.mock('/mock/invite/list', {
		'lst|8-10': [
			{
				"createtime": Random.datetime('yyyy-MM-dd HH:mm:ss'), 
				"chain_bonus": Random.natural(0, 99),
				"exp": Random.natural(0, 9999),
				"tid": Random.natural(100000, 999999),
				"_phone": "123"
			}
			]
	})

	Mock.mock('/mock/userinfo', {
		"nickname": Random.name(),
		"gender|1": ["Male", "Female"],
		"email": Random.email(),
	})
