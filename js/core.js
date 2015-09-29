define([
	'Master/Master_View',
	'Master/Master_Model',
	'js/Libs/parse'
], function (MasterView, MasterModel, parse) {
	'use strict';

	var HouserCore = function () {
		// Load the view manager so routes are handled.
		var master_view = new MasterView({model: new MasterModel()});

		return {
			init: function () {
				var self = this,
					route;

				window.Parse = parse;
				Parse.initialize("93V9ZnU9nmta5O88zOTQ7vrorfsmf9n7biraFaZm", "hO8z1DOsZiRPy0Yn037C7VeUtHrH2zPDslpWhJ4E");

				//window.history.replaceState({}, 'signin', 'signin');
				//Backbone.history.navigate('signin')
				if(localStorage && localStorage.getItem("houser_login_token")) {
					route = 'property_lists';
				} else {
					route = 'signin'
				}

				if (Backbone.history.getFragment() === route) {
					Backbone.history.loadUrl(route);
				} else {
					HOUSER.router.navigate(route, {trigger: true});
				}





//				HOUSER.router.navigate('welcome', {trigger: true});

//				$.ajax({
//					type: "POST",
//					contentType: "application/json; charset=utf-8",
//					url: '/WebUtilities/DetailsWebService.asmx/GetPropertiesBySaleDate',
//					data: "{sDate: '" + '7/2/2015' + "', list: '" + 2 + "', sUserID: '" + 1 + "'}",
//					dataType: "json",
//					async: true,
//					success: function (responce) {
//						if (responce.d != "") {
//							var pages = new PropertyCollection(JSON.parse(responce.d));
//							console.log(pages);
//
//						} else {
//							$(".wrapper").html("");
//							data = null;
//						}
//					},
//					error: function (error) {
//						data = error;
//					}
//				});
			}
		}
	}
	return HouserCore();
});
// Test is this getting added.
