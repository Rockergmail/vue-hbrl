<style>
	@import '~vux/dist/vux.css';
	/* reset x-button */
	button.weui_btn{
		width:90%;
	}
	.weui_btn_primary {
	  background-color: #dc5454;
	}
	.weui_btn_primary:not(.weui_btn_disabled):active {
	  color: rgba(255, 255, 255, 0.4);
	  background-color: #C13E3E;
	}

	/* add vux-tab-unselected */
	.vux-tab-unselected{color:rgb(102, 102, 102);;}

	/* reset progress */
	.weui_progress{position: absolute;top:46px;width:100%;display:block;}
    .weui_progress_bar{
    	background: none;
    	height:3px;
    	width:100%;
    }
    /*.weui_progress_inner_bar{background: yellow}*/
    .weui_progress_opr{display: none;}
    .weui_progress_inner_bar.js_progress.effect1{
    	-webkit-animation: animation1 1s ease-in-out;
    	animation: animation1 1s ease-in-out;
    	opacity: 1;
    	width:30%;
    }
    .weui_progress_inner_bar.js_progress.effect2{
    	-webkit-animation: animation2 .6s ease-in-out;
    	animation: animation2 .6s ease-in-out;
    	opacity: 0;
    	width:100%;
    }

	@-webkit-keyframes animation1{
		0%{opacity: 1; width: 0;}
		100%{opacity: 1; width: 30%;}
	}

	@keyframes animation1{
		0%{opacity: 1; width: 0;}
		100%{opacity: 1; width: 30%;}
	}

	@-webkit-keyframes animation2{
		0%{opacity: 1; width: 30%;}
		100%{opacity: 0; width: 100%;}
	}

	@keyframes animation2{
		0%{opacity: 1; width: 30%;}
		100%{opacity: 0; width: 100%;}
	}

    /*reset toast*/
    #ximi_toast .weui_toast{
    	top:86%;
    }

    /*Media Query*/

    /*iPhone 2G-4S in portrait*/
    @media only screen 
    and (min-device-width : 320px) 
    and (max-device-width : 480px) 
    { html,body{font-size:16px;} }

    /*iPhone 5 & 5S in portrait & landscape*/
	@media only screen 
	and (min-device-width : 320px) 
	and (max-device-width : 568px)
	{ html,body{font-size:16px;} }

	/*iPhone 6 in portrait & landscape*/
	@media only screen 
	and (min-device-width : 375px) 
	and (max-device-width : 667px)
	{ html,body{font-size:16px;} }

	/*iPhone 6 Plus in portrait & landscape*/
	@media only screen 
	and (min-device-width : 414px) 
	and (max-device-width : 736px)
	{ html,body{font-size:16px;} }

</style>

<template>

<div id="wrapper">
	<loading :show="showLoading"></loading>
	<x-popup :p-type.sync="pType" :custom-click-yes.sync="pClickYes" :p-value.sync="pValue"></x-popup>
	<!-- <x-popup :p-type.sync="pType" :custom-click-yes.sync="pClickYes"></x-popup> -->
	<progress :effect1.sync="effect1" :effect2.sync="effect2"></progress>
	<x-toast :t-string.sync="toastString" :t-time="toastTime" :t-type.sync="toastType" :t-width="toastWidth"></x-toast>
	<router-view></router-view>
</div>

</template>

<script>
import progress from "vux/src/components/progress"
import loading from "vux/src/components/loading"
import xPopup from "./common/xPopup"
import xToast from "./common/xToast"
import md5 from "md5"

module.exports = {
	components: {
		"progress": progress,
		"loading": loading,
		"x-popup": xPopup,
		"x-toast": xToast
	},
	data () {
		return {
			// 登录信息
			token: "",

			// 路由相关
			// routeHistory:[],
			// currentRoute: 0,

			// loading & progress组件相关
			loadingTimer: null,
			effect1: false,
			effect2: false,
			showLoading: false,

			// x-toast相关
			toastWidth: "",
			toastTime: 0,
			toastType: -1,
			toastString: "",

			// x-popup相关
			pType: "",
			pValue: {},
			pClickYes: function(){},

			// 客户端地址封装
			HTTP: 'http://',
			URL_SCHEME: 'zs20160606://',
			// CLIENT_IP: "127.0.0.1",
			// CLIENT_IP: "172.16.8.243",
			CLIENT_IP: "172.16.8.224",
			// CLIENT_IP: "192.168.1.138",
		    CLIENT_PORT: "40000",

		    // 服务端地址封装
		    SERVER: "http:// test2.hongbaorili.com"
		}
	},
	computed: {
		CLIENT_HOST: function() {
			return this.CLIENT_IP + ":" + this.CLIENT_PORT
		},
		CLIENT_LINK: function() {
			return this.HTTP + this.CLIENT_HOST
		},
		CLIENT_URL: function(){
			return {
				//　获取限时任务列表
				"taskList": this.CLIENT_LINK + "/GetSourceData",
				"taskDetail": this.CLIENT_LINK + "/TaskDetail",
				"snatchTask": this.CLIENT_LINK + "/SnatchTask",
				"giveUpTask": this.CLIENT_LINK + "/GiveUpTask",
				"reviewTask": this.CLIENT_LINK + "/ReviewTask",
				// 小助手心跳检查
				"ping": this.CLIENT_LINK + "/ping",
				"copy": this.CLIENT_LINK + "/CopyKeyWord",
				"login": this.URL_SCHEME + "rootaction?page=login"

			}
		}
	},
	methods: {
		// loading & progress组件相关
		endLoading: function(status){
			if (status) {
				clearTimeout(this.loadingTimer);
				this.showLoading = false;
				this.effect2 = true;
				console.log("endLoading")
			}
		},
		startLoading: function() {
			var _this = this;
			this.effect1 = true;
			this.loadingTimer = setTimeout(function(){
				_this.showLoading = true;
			}, 2000)
			console.log("startLoading")
		},
		resetLoading: function() {
			
			// reset progress
			this.effect1 = false;
			this.effect2 = false;

			// reset x-popup
			if (this.pType !== "getMoneySuccess") {
				this.pType = "";
			}
			console.log("resetLoading")
		},

		// x-toast相关
		toastStart: function(str, time=2000, type=0, tWidth="80%") {
			this.toastString = str;
			this.toastTime = time;
			this.toastType = type;
			this.toastWidth = tWidth
		},

		// x-popup相关
		popupStart: function(type, val={}, fn=function(){}) {
			this.pType = type;
			this.pValue = val;
			this.pClickYes = fn;
		},


		// transition stuff
		giveUpTransition: function(transition){
			transition.abort();
			this.endLoading(true);
		},

		// 路由相关
		// afterLoaded: function() {
		// 	this.routeHistory[this.currentRoute++] = this.$route.path;
		// },
		// onClickBack: function() {
		// 	this.$router.go(this.routeHistory[this.currentRoute--]);
		// },

		// x-header相关


		// 小助手相关
		/**
	     *  签名生成算法
	     *
	     *  @param params {json} 需要进行md5的参数
	     *  @param access_key {string} md5加盐
	     *  @return {string}
	     */
		getSignature: function(params, access_key) {
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
	    },
	    /**
	     *  小助手代理发送并接收数据
	     *
	     *  @param params {json} 前端跟后端交互需要用到的数据
	     *  @param options {json} 前端通过客户端转发需要用到的数据
	     *		   options.sUrl 后端的url
	     *		   options.sPath 后端的path
	     *		   options.sMethod 跟后端通讯的方法post,get
	     *		   options.cUrl 客户端的url
	     *		   options.cMethod 跟客户端通讯的方法post,get
	     *  @return {string|json}
	     */
    	getFromClient(params, options, successCb, failCb) {

    		 // 由于ajax自动会将参数encode，所以进行md5之前要encode
        	var stringifyParams = JSON.stringify(params),
                encodedParams = encodeURIComponent(stringifyParams),
                encodedUrlhost = encodeURIComponent(options.sUrl),
                encodedUrlpath = encodeURIComponent(options.sPath),

                md5Json = {
                    jsonparams: encodedParams,
                    urlhost: encodedUrlhost,
                    urlpath: encodedUrlpath,
                    sMethod: options.sMethod
                },

                newParams = {
                    jsonparams: stringifyParams,
                    urlhost: options.sUrl,
                    urlpath: options.sPath,
                    sMethod: options.sMethod
                };

            newParams.sign = this.getSignature(md5Json);

        	this.$http({url: options.cUrl, method: options.cMethod, params: newParams}).then(
        		// success
        		function(response){
        			successCb(response);
        		},
        		// fail
        		function(response){
        			failCb(response);
        		})
        },
        heartbeatCheck: function(transition, type, option, url) {
        	var _this = this,
	     		type = type || "normal",
	     		option = option || {_timeout: 2000, interval: 2000},
	     		url = this.CLIENT_URL.ping;

         	switch (type) {
         		// 普通心跳检查：只检查1次；失败就popup
	         	case "normal":
	     		// var normalCounter = 0,
	     			// normalTimer = setInterval(function(){
		     		return this.$http.get(url, {_timeout: option.timeout}).then(
			     		// success
			     		function(response){
			     			// normalCounter++;
			     			// if (normalCounter > 2) {
				     		// 	clearInterval(normalTimer);
				     		// } else {
			     			// 	// get session and write it in cookie
			     			// }
			     			this.loginAction();
			     		},
			     		// fail
			     	 	function(response){
			     	 		var _this = this;
			     	 		this.popupStart("activate",{}, function(){
			     	 			location.href = _this.URL_SCHEME;
			     	 		});
			     	 		transition.abort();
				 		}
			 		);
		     	// }, option.interval);
	         		break;
	         	// 任务心跳检查：一直检查，失败就popup
	         	case "mission":
	         		// var missionCounter = 0,
	         		var missionTimer = setInterval(function(){
	    	     		this.$http.get(url, {_timeout: option.timeout}).then(
	    		     		// success
	    		     		function(response){ 
	    		     			missionCounter++;
	    		     			if (missionCounter < 2) {
	    		     				_this.loginAction()
	    		     			}
	    		     			// else: pass
	    		     		},
	    		     		// fail
	    		     	 	function(response) {
	    		     	 		clearInterval(missionTimer);
	    		     	 		_this.popupStart("activate",{}, function(){
				     	 			location.href = this.URL_SCHEME;
				     	 		});
				     	 		transition.abort();
	    		 		});
	    	     	}, option.interval);
	    	     	break;
         	}
     },
     loginAction: function(){
     	var _this = this;
     	this.$root.getFromClient(
     	    {a:1, b:"中文测试"},
     	    {"sUrl":"http://test2.hongbaorili.com", 
     	     "sPath":"loginaction", 
     	     "sMethod":"POST", 
     	     "cUrl":this.$root.CLIENT_LINK + "/rootaction",
     	     "cMethod":"GET"}, 
     	     function(response){
     	     	_this.token = response.token; 
     	     	_this.$broadcast("loginSuccess", true);
     	     }, 
     	     function(response){
     	     	this.$root.toastStart("error 登录失败");
     	     }
 	    );
     }
	}
}
</script>