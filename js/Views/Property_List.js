define([
	'Views/SubViewSuper',
	'text!Templates/property_list.tmpl',
	'js/ajax',
	'js/Data_Utils/Property'
], function (SubView, _template, ajax, property_util) {
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

			self.addAdditionalDataToModel();
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
		addAdditionalDataToModel: function() {
			var self = this,
				account_ids;

			account_ids = self.model.get('properties').pluck('AccountNumber');
			property_util.getImprovementData(account_ids).done(function (data) {
				self.model.set('extra_data', data);
				console.log(self.model);
			});
		},
		propClick: function (e) {
			var self = this,
				target = $(e.target).closest('li'),
				prop = target.data("id");

			HOUSER.current_prop = self.model.get('properties').findWhere({AccountNumber: prop});
			HOUSER.router.navigate('property', {trigger: true});
		}
	});

	return View;
});
