var Vue = require("vue"),
	VueRouter = require("vue-router"),
	VueResource = require("vue-resource"),
	Mock = require("mockjs"),
	md5 = require("md5");

import app from "./components/App"
import Home from './components/Home'
import progress from "vux/src/components/progress"
// import xHeader from "vux/src/components/x-header"
import loading from "vux/src/components/loading"


	// Debug mode
	Vue.config.debug = true;
	// 使用vue-router && vue-resource
	Vue.use(VueRouter);
	Vue.use(VueResource);


var router = new VueRouter(),
	store = {}, 
		// use to store state, mainly in userinfo->telphone\wechat

	// 客户端配置信息
	HTTP = "http://",
	URL_SCHEME = "mayike://",
	CLIENT_IP = "127.0.0.1",
	CLIENT_PORT = "40000",
	CLIENT_HOST = CLIENT_IP + ":" + CLIENT_PORT,
	CLIENT_URL = HTTP + CLIENT_HOST;

	// 注册组件
	// Vue.component("x-header", xHeader);
	Vue.component("loading", loading);
	Vue.component("progress", progress);
	// 路由表
	router.map({
		'/': {
			component: Vue.extend(Home)
		},
		'/userinfo': {
			component: function(resolve){
				require(['./components/UserInfo.vue'], resolve);
			}
		},
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
		// '/showoff': {
		// 	component: function(resolve){
		// 		require(['./components/Showoff.vue'], resolve);
		// 	}
		// },
		'/income': {
			component: function(resolve){
				require(['./components/Income.vue'], resolve);
			}
		}
	});


	// 路由切换前
	router.beforeEach(function(transition){
		// 如何跟progress组件通讯？
		// if (!transition.from.path && transition.to.path !== "/") {
			router.app.showProgress = true
			router.app.percent = 30
		// }
		    router.app.showLoading = true

		    console.log("before");

		    transition.next()

		    // loading
	})

	// 路由切换后
	router.afterEach(function(transition){
		// if (!transition.from.path && transition.to.path !== "/") {
			router.app.showLoading = false
			router.app.opacity = 0
			router.app.percent = 100
		// }
		
		setTimeout(
			function(){
				router.app.showProgress = false
				router.app.opacity = 1
				router.app.percent = 0
			}, 1000)		
		console.log("after");
	})

	// 启动路由
	router.start(app, "#app");
	window.router = router;


	/**
     *  签名生成算法
     *
     *  @param    {json}  params
     *  @param   {string} access_key
     *  @return   {string}
     */
	function getSignature (params, access_key) {
		access_key = access_key || "e1064a500b2640ff0a74439f1758c6aa";

		var str = '', tmp_arr = [];
		for (var p in params) tmp_arr.push(p);
		// 参数根据其参数名进行降序排序
		tmp_arr.sort();
		// 遍历排序后的参数，拼接 key=value 字符串
		for (var i = 0; i < tmp_arr.length; i++)
		    str += tmp_arr[i] + '=' + params[tmp_arr[i]];
		// 在拼接字符串后再接上 access_key
		str += access_key;
		// 通过 MD5 算法为签名字符串生成一个 MD5 签名，该签名就是 sign 参数值
		return md5(str);
	}

	// function cAjax (params, sUrl, sPath, type="GET", cUrl=CLIENT_URL, method="GET") {
	function cAjax (params, sUrl, sPath, type, cUrl, method) {

		 // 由于ajax自动会将参数encode，所以进行md5之前要encode
    	var stringifyParams = JSON.stringify(params),
            encodedParams = encodeURIComponent(stringifyParams),
            encodedUrlhost = encodeURIComponent(sUrl),
            encodedUrlpath = encodeURIComponent(sPath),

            md5Json = {
                jsonparams: encodedParams,
                urlhost: encodedUrlhost,
                urlpath: encodedUrlpath,
                type: type
            },

            newParams = {
                jsonparams: stringifyParams,
                urlhost: sUrl,
                urlpath: sPath,
                type: type
            };

        newParams.sign = getSignature(md5Json);

    	Vue.http({url: cUrl, method: method, data: newParams}).then(
    	// Vue.http.post(cUrl, {method: method, data: newParams}).then(
    		// success
    		function(response){
    			alert(response.data);
    		},
    		// fail
    		function(response){
    			alert(response.data);
    		})
    }

 	// function heartBeatCheck (type, option={"url": HEARTBEAT_URL, "host":CLIENT_HOST, "timeout":1800, "interval":2000}) {
 	function heartBeatCheck (type, option) {
 		type = type || "GET";
 		// option.
     	switch (type) {
     	case "normal":
     		var normalCounter = 0,
     			normalTimer = setInterval(function(){
	     		Vue.http.post(option.url, {timeout: option.timeout}).then(
		     		// success
		     		function(){
		     			normalCounter++;
		     			if (normalCounter > 2) {
			     			clearInterval(normalTimer);
			     		} else {
		     				// get session and write it in cookie
		     			}
		     		},
		     		// fail
		     	 	function() {
		     	 		clearInterval(normalTimer);
		     	 		// pop up to startup assist
		 		});
	     	}, option.interval);
     		break;
     	case "mission":
     		var missionCounter = 0,
     			missionTimer = setInterval(function(){
	     		Vue.http.post(option.url, {timeout: option.timeout}).then(
		     		// success
		     		function(){ 
		     			missionCounter++;
		     			if (missionCounter < 3) {
		     				// get session and write it in cookie
		     			}
		     		},
		     		// fail
		     	 	function() {
		     	 		clearInterval(normalTimer);
		     	 		// pop up to startup assist
		 		});
	     	}, option.interval);
	     	break;
     	}
     }

     // document.body.onclick=function(){
     // 	// cAjax (params, sUrl, sPath, type, cUrl, method) {
     // 	cAjax({a:1}, "http://test2.hongbaorili.com", "loginaction", "POST", CLIENT_URL+"/rootaction", "GET");
     // }
	///////////////////////////////////////////////
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
	// 	timeout: 1000
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
