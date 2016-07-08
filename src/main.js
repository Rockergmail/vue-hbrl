var Vue = require("vue"),
	VueRouter = require("vue-router"),
	VueResource = require("vue-resource"),
	Mock = require("mockjs");
	// md5 = require("md5");

import app from "./components/App"
import Home from './components/Home'

	window.Vue = Vue;
	// Debug mode
	Vue.config.debug = true;
	// 使用vue-router && vue-resource
	Vue.use(VueRouter);
	Vue.use(VueResource);


	var router = new VueRouter();

	// vue-resource全局配置
	// Vue.http.options.credentials = true;

	// 路由表
	router.map({
		// 首页
		'/': {
			component: Vue.extend(Home)
		},
		// 限时任务
		'/taskList/:tasktype': {
			name: "list",
			component: function(resolve){
				require(['./components/TaskList.vue'], resolve);
			}
		},
		'/taskDetail/:tasktype/:adid': {
			name: "detail",
			component: function(resolve){
				require(['./components/TaskDetail.vue'], resolve);
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
		// 收入明细W
		'/income': {
			component: function(resolve){
				require(['./components/Income.vue'], resolve);
			}
		}
	});


	// 路由勾子canUse之前
	router.beforeEach(function(transition){
		// if (transition.from.name == "detail") {
		// 	router.app.popupStart("giveup",function(){alert("u son of bitch")})
		// 	transition.abort()
		// }
		router.app.endLoading();
		router.app.heartbeatCheck(transition)
	    transition.next();
	})

	// 路由勾子activate之前
	router.afterEach(function(transition){
		router.app.resetLoading();

		if (transition.from.path) {
			router.app.startLoading();
		} else {
			router.app.firstPage = false;
		}
	})

	// 启动路由
	router.start(app, "#app");

	// vue-resource 个性化：
	// 1.　新增_tiemout选项，返回request timeout方便写回调
	// 2. 每次调用http，前会调用startLoading，后会调用endLoading
	Vue.http.interceptors.push(function(request, next){
		var timeout; 

		router.app.endLoading();
		router.app.resetLoading();

		// 不显示loading的：
		// 1. 首页transition
		// 2. ping
		// 3. 第二次以上login不需要，而且不需要同步

		// 显示loading的：
		// 1.　第一次login
		// 2.　非首页transition
		// 3.　else ajax


		console.log(request.url + " " + router.app.CLIENT_URL.login + " " + router.app.CLIENT_URL.ping)
		if (!router.app.firstPage && ((request.url != router.app.CLIENT_URL.login) || (request.url != router.app.CLIENT_URL.ping))) {
			router.app.startLoading();
		} else {
			console.log("no loading")
		}

		if (request._timeout) {
			timeout = setTimeout(function(){
				next(request.respondWith(request.body, {
					status: 408,
					statusText: 'request timeout'
				}))
			}, request._timeout)
		}

		next(function(response){
			clearTimeout(timeout);
			response.data = response.json(response.data);
			router.app.endLoading();
		})
	});

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

	// Mock.setup({
	// 	timeout: 3000
	// })

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
