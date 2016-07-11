var routerDataMixin = {
	route: {
        data: function(transition) {
        	console.log(this.ajax)
        	try {
        		this.ajax.beforeGetUserData()
        	} catch	(e) {}
            return this.getUserData(transition);
        },
        waitForData: true
    },
    methods: {
    	getUserData: function(transition) {
        	var _this = this;
    		return new Promise(
                function(resolve, reject){
                    _this.$http.get(
                    	_this.ajax.url,
                    {
                    	// method: _this.ajax.method || 'GET',
                        params: _this.ajax.params || {},
                        _timeout: _this.ajax.timeout || 0
                    }).then(
                    function (response) {
                        resolve(response)
                    },
                    function (response) {
                        reject(response)
                    });
                }
            ).then(function(response){
            		_this.successCb(response)
              //   try {
            		// _this.successCb(response)
              //   } catch (e) {
              //   	console.log(e)
              //   	try{
              //   		if (response.data.c == 0) {
              //   			console.log("fuck?");
	             //    		// transition.next({userData:response.data.d});
	             //    	} else {
	             //    		reject("c != 0")
	             //    	}
		            // } catch (e) {

		            // }
              //   }
            }).catch(function(err){
                console.log(err);
                try {
            		_this.failCb(err)
                } catch (e) {

                }
                _this.$root.toastStart("一大波用户在涌入，请稍后再试！");
                try{
                	transition.abort(err)
                } catch	(e) {

                }
            });
    	}
    }
}

export {
	routerDataMixin
}