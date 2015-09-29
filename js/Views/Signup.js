define([
	'Views/SubViewSuper',
	'text!Templates/signup.tmpl',
	'Models/Signin',
	'js/ajax'
], function (SubView, welcome_template, Model, ajax) {
	'use strict';

	var View = SubView.extend({

		events: {
			'keyup .houser_signin_input': 'updateModel',
			'click .houser-submit-signup': 'submitSignup',
			'click .houser-signin-button': 'signupClick'
		},
		
		el: $('.wrapper'),
		selector: '.wrapper',
		template: _.template(welcome_template),

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
			$('.houser-signin-name').val(model.get('name'));
			
			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
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
			model.set({'name': $('.houser-signin-name').val()});
			
		},
		
		/**
		@Description:	Submit login, set token, and redirect.
		@Events:		click .houser-submit-signin
		**/
		submitSignup: function (e) {
			e.preventDefault();
			
			var self = this,
				model = self.model,
				data;
			
			self.updateModel();
			
			data = {
				email: model.get('email'),
				password: model.get('password'),
				name: model.get('name')
			};
			
			//
			//
			// CREATE SERVICE AND AJAX CALL
			//
			//
			
			HOUSER.router.navigate('welcome', {trigger: true});
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
			HOUSER.router.navigate('signin?' + JSON.stringify(data), {trigger: true});	
		},
	});

	return View;
});
