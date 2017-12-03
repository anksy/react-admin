(function(){
	/*creating an env for application*/
	window._env = window._env || {};

	window._env = {
		app : "Steward"
	};

	if(parseInt(window.location.port)===3000){
		/*env is localhost*/
		window._env.prefix = "_DEV_";
		window._env.baseUrl= "http://localhost:5000/"
	}
	else if(parseInt(window.location.port)===5001){
		/*env is staging*/
		window._env.prefix = "_DEV_";
		window._env.baseUrl = "http://158.85.76.204:5000/";
	}
	else if(parseInt(window.location.port)===5002){
		/*env is production*/
		window._env.prefix = "_PROD_";
		window._env.baseUrl = "http://158.85.76.204:5001/";
	}

	window._env.appPath = window._env.baseUrl+"api/";
	window._env.adminPath = window._env.baseUrl+"admin_api/";

}());