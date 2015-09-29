define([
	'Views/SubViewSuper',
	'text!Templates/signin.tmpl',
	'Models/Signin',
	'js/ajax'
], function (SubView, _template, Model, ajax) {
	'use strict';

	var View = SubView.extend({

		events: {
			'keyup .houser_signin_input': 'updateModel',
			'click .houser-submit-signin': 'submitLogin',
			'click .houser-signup-button': 'signupClick'
		},

		el: $('.wrapper'),
		selector: '.wrapper',
		template: _.template(_template),

		/**
		@Description:	Initialize the view.
		**/
		initialize: function (options) {
			var self = this;

			options = options || {};

			self.model = HOUSER.current_view_model = new Model(options.model);
			self.render();
		},

		/**
		@Description:	Render the view.
		**/
		render: function () {
			var self = this,
				model = self.model;

			$(self.selector).html(self.template(model));

			$('.houser-signin-email').val(model.get('email'));
			$('.houser-signin-password').val(model.get('password'));

			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
				//HOUSER.router.navigate('main', {trigger: true});
			}, 100);

		},

		/**
		@Description:	Update model with data from inputs.
		@Events:		keyup .houser_signin_input
		**/
		updateModel: function () {
			var self = this,
				model = self.model;

			model.set({'email': $('.houser-signin-email').val()});
			model.set({'password': $('.houser-signin-password').val()});
		},

		/**
		@Description:	Submit login, set token, and redirect.
		@Events:		click .houser-submit-signin
		**/
		submitLogin: function (e) {
			e.preventDefault();

			var self = this,
				model = self.model,
				data;

			self.updateModel();

			// data = {
			// 	email: model.get('email'),
			// 	password: model.get('password')
			// };

			// Convert to parse.
			// ajax.post(data, ajax.service.user.submitLogin, {
			// 	success: function (resp) {
			// 		if (resp && resp.d && resp.d.authorized) {
			// 			HOUSER.USER_TOKEN = resp.d.token;
			// 			if (localStorage) {
			// 				localStorage.setItem("houser_login_token", HOUSER.USER_TOKEN);
			// 			}
			// 			HOUSER.router.navigate('property_lists', {trigger: true});
			// 		} else {
			// 			alert('User not authorized.');
			// 		}
			// 	},
			// 	error: function (resp) {
			// 		console.error(resp);
			// 	}
			// });
			HOUSER.router.navigate('property_lists', {trigger: true});
		},

		/**
		@Description:	Submit login, set token, and redirect.
		@Events:		click .houser-register-button
		**/
		signupClick: function (e) {
			e.preventDefault();

			var self =this,
				data = {
					model: {
						email: self.model.get('email'),
						password: self.model.get('password'),
						name: self.model.get('name')
					}
				};
			HOUSER.router.navigate('signup?' + JSON.stringify(data), {trigger: true});
		}
	});

	return View;
});
