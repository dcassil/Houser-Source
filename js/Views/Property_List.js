define([
	'Views/SubViewSuper',
	'text!Templates/property_list.tmpl',
	'js/ajax'
], function (SubView, _template, ajax) {
	'use strict';

	var View = SubView.extend({

		events: {
			'click .houser_prop_item': 'propClick'
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

			self.model = HOUSER.current_view_model = HOUSER.current_list;
			self.render();
		},

		/**
		@Description:	Render the view.
		**/
		render: function () {
			var self = this,
				model = self.model;

			$(self.selector).html(self.template({list: self.model}));

			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
			}, 100);

		},
		propClick: function (e) {
			var self = this,
				target = $(e.target).closest('li'),
				prop = target.data("id");

			HOUSER.current_prop = self.model.get('properties').findWhere({account_id: prop});
			HOUSER.router.navigate('property', {trigger: true});
		}
	});

	return View;
});
