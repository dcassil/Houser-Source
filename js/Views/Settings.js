define([
	'jquery',
	'underscore',
	'backbone',
	'text!Templates/settings.tmpl',
], function ($, _, Backbone, settings_template) {
	'use strict';

	var WelcomeView = Backbone.View.extend({

		template: _.template(settings_template),
		initialize: function (options) {
			var self = this,
				data = options.toJSON();

			self.render(data);
		},
		render: function (data) {
			var self = this;

			$('.main_wrapper').html(self.template(data));
			window.setTimeout(function () {
				$('.houser-settings').addClass('show');
			}, 100);
		}
	});

	return WelcomeView;
});
