<template>

<header id="mynav" class="bar bar-nav">
	
    <a v-link="prevRoute" v-show="gobackshow" class="icon icon-left pull-left"></a>
	
    <a v-link="{ path : '/'}" v-show="closeshow">关闭</a>
	
    <a v-show="refreshshow" @click="refresh()" class="icon icon-refresh pull-right"></a>

    <button class="button pull-right" v-show="buttonshow">确定</button>

	<h1 class="title"> {{ title }} </h1>
</header>
</template>
<script>
module.exports = {
    name: "mynav",
    props: {
    	gobackshow: {
    		type: Boolean,
    		default: true
    	},
    	closeshow: {
    		type: Boolean,
    		default: false
    	},
    	rightshow: {
    		type: Boolean,
    		default: true
    	},
    	menushow: {
    		type: Boolean,
    		default: false
    	},
    	buttonshow: {
    		type: Boolean,
    		default: false
    	},
    	refreshshow: {
    		type: Boolean,
    		default: false
    	},
    	title: {
    		type: String,
    		required: true
    	},
        prevRoute: {
            type: String
        }
    },
    data: function () {
    	return {
    		pathMatch: location.hash.match(/(\/[a-zA-Z]+)+/)
    	}
    },

    methods: {
    	refresh: function() {
    		location.reload();
    	}
    },

    computed: {
    	prevRoute: function(){
    		if (this.pathMatch[0] != this.pathMatch[1]) {
	    		return this.pathMatch[0].substring(0,this.pathMatch[0].search(this.pathMatch[1]));
    		} else {
    			return "/"
    		}
    	}
    }
};
</script>