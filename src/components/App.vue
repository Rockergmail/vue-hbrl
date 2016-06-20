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
    	height:2px;
    }
    .weui_progress_inner_bar{background: yellow}
    .weui_progress_opr{display: none;}
    .weui_progress_inner_bar.js_progress{
    	-webkit-transition:width .1s ease-in .2s; 
    	transition:width .1s ease-in .2s;
    	-webkit-transition:opacity .8s ease-in .2s; 
    	transition:opacity .8s ease-in .2s;
    }
</style>

<template>

<div id="wrapper">
	<loading :show="showLoading"></loading>
	<progress :percent.sync="percent" v-if="showProgress" :opacity.sync="opacity"></progress>
	<!-- <progress :percent.sync="percent"></progress> -->
	<router-view></router-view>
</div>

</template>

<script>

module.exports = {
	data () {
		return {
			showLoading: false,
			showProgress: false,
			percent:0,
			opacity:1
		}
	},
	route: {
		data: function(transition) {
			// router.app.showLoading = false
			// router.app.opacity = 0
			// router.app.percent = 100
			
			// setTimeout(
			// 	function(){
			// 		router.app.showProgress = false
			// 		router.app.opacity = 1
			// 		router.app.percent = 0
			// 	}, 1000)		
			console.log("afterparty");
		}
	}
}
</script>