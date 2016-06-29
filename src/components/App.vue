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
    .weui_progress_inner_bar.js_progress{
    	-webkit-transition: width .6s ease-in-out, opacity .6s ease-in;
    	transition: width .6s ease-in-out, opacity .6s ease-in;
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
	<x-popup :p-type.sync="pType" :custom-click-yes="pClickYes"></x-popup>
	<progress :percent.sync="percent" v-if="showProgress" :opacity.sync="opacity"></progress>
	<x-toast :t-string="toastString" :t-time="toastTime" :t-type.sync="toastType" :t-width="toastWidth"></x-toast>
	<router-view></router-view>
</div>

</template>

<script>
import progress from "vux/src/components/progress"
import loading from "vux/src/components/loading"
import xPopup from "./common/xPopup"
import xToast from "./common/xToast"

module.exports = {
	components: {
		"progress": progress,
		"loading": loading,
		"x-popup": xPopup,
		"x-toast": xToast
	},
	data () {
		return {
			// loading & progress组件相关
			showLoading: false,
			showProgress: false,
			percent:0,
			opacity:1,
			timer: null,

			// x-toast相关
			toastWidth: "",
			toastTime: 0,
			toastType: "",
			toastString: "",

			// x-popup相关
			pClickYes: function(){},
			pType: "",

			// 客户端地址封装
			HTTP: 'http://',
			// CLIENT_IP: "127.0.0.1",
			// CLIENT_IP: "172.16.103.61",
			// CLIENT_IP: "172.16.103.111",
			CLIENT_IP: "192.168.1.138",
		    CLIENT_PORT: "40000"
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
				"copy": this.CLIENT_LINK + "/CopyKeyWord"

			}
		}
	},
	methods:{
		// loading & progress组件相关
		endLoading: function(status){
			if (status) {
				clearTimeout(this.timer)
				this.showLoading = false
                this.opacity = 0
                this.percent = 100  
			}
			console.log("endLoading")
		},
		startLoading: function() {
			var _this = this
			// this.resetLoading()
			this.showProgress = true
			this.percent = 30
			this.timer = setTimeout(function(){
			    _this.showLoading = true
			}, 2000)
			console.log("startLoading")
		},
		resetLoading: function() {
			this.showLoading = false
			this.showProgress = false
			this.opacity = 1
			this.percent = 0
			console.log("resetLoading")
		},

		// x-toast相关
		toastStart: function(str, time=2000, type="text", tWidth="80%") {
			this.toastString = str;
			this.toastTime = time;
			this.toastType = type;
			this.toastWidth = tWidth
		},

		// x-popup相关
		popupStart: function(type, fn=function(){}) {
			this.pType = type;
			this.pClickYes = fn;
		},

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
    	getFromClient(params, options) {

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

        	this.$http({url: options.cUrl, method: options.cMethod, data: newParams}).then(
        		// success
        		function(response){
        			return response;
        		},
        		// fail
        		function(response){
        			return response;
        		})
        },
        heartBeatCheck: function(type, options) {
     		type = type || "normal";
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
	}
}
</script>