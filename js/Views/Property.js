define([
	'Views/SubViewSuper',
	'text!Templates/property.tmpl',
	'js/ajax',
	'js/xml',
	'js/Data_Utils/Property'
], function (SubView, _template, ajax, xml, tps) {
	'use strict';

	var View = SubView.extend({

		events: {
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

			self.model = HOUSER.current_view_model = HOUSER.current_prop;
			self.addExtraData().done(function () {
				//console.log(data);
				self.render();
			});
			//self.render();

		},

		/**
		@Description:	Get data from zillow and or other sources..
		**/
		addExtraData: function () {
			var self = this,
				model = self.model;

			return tps.getZillowDeepSearch(model);
		},

		/**
		@Description:	Render the view.
		**/
		render: function () {
			var self = this,
				model = self.model;

			$(self.selector).html(self.template({prop: model}));

			self.getPropertyImage(model.get('account_link'));

			window.setTimeout(function () {
				$('.signin_flex_form').addClass('show');
			}, 100);

		},
		// move to unit class

		// getPropertyImage: function (link) {
		// 	var get_req = ajax.proxyGet(link).done( function (resp) {
		// 		resp = resp.documentElement.childNodes[0].nodeValue
		// 		resp = resp.replace(/src="/g, 'data-src="');
		// 		var img_array = $(resp).find('a img[data-src*="sketches"]').map(function () {return $(this).data('src')}).sort();
		//
		// 		var loadImage = function (index) {
		// 			if (index >= img_array.length) {
		// 				return;
		// 			}
		// 			var link = img_array[index],
		// 				img_link = 'http://www.oklahomacounty.org/assessor/Searches/' + link;
		// 			$('.propertyImage').attr('src', img_link).error(function () {
		// 				console.log('failed to load image');
		// 				loadImage(index + 1);
		// 			});
		// 		};
		// 		loadImage(0);
		// 	});
		// 	console.log(get_req);
		// }
		getPropertyImage: function (link) {
			var get_req = $.get(link).done( function (resp) {
				resp = resp.replace(/src="/g, 'data-src="');
				var img_array = $(resp).find('a img[data-src*="sketches"]').map(function () {return $(this).data('src')}).sort();

				var loadImage = function (index) {
					if (index >= img_array.length) {
						return;
					}
					var link = img_array[index],
						img_link = 'http://www.oklahomacounty.org/assessor/Searches/' + link;
					$('.propertyImage').attr('src', img_link).error(function () {
						console.log('failed to load image');
						loadImage(index + 1);
					});
				};
				loadImage(0);
			});
			console.log(get_req);
		}
	});

	return View;
});
