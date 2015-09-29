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
				deferred = $.Deferred(),
				model = self.model,
				data;

			data = {
				'zws-id': ajax.api_keys.zillow,
				address: (model.get('address')),
				citystatezip: (model.get('city') + '+' + model.get('state'))
			};

			ajax.proxyGet(ajax.api_url.zillow_deep_search, data).done(function (resp) {
				if (resp) {
					var zd,
						xml_node = $.parseXML(xml.toJSON(resp.children[0])['#text']).getElementsByTagName('result');
					//$.parseXML(xml.toJSON(resp.children[0])['#text']).getElementsByTagName('result')
					if (xml_node.length) {
						zd = xml.toJSON(xml_node[0]);
						model.set('zpid', zd.zpid['#text']);
						model.set('baths', zd.bathrooms['#text']);
						model.set('beds', zd.bedrooms['#text']);
						model.set('sqft', zd.finishedSqFt['#text']);
						model.set('lot', zd.lotSizeSqFt['#text']);
						model.set('year_built', zd.yearBuilt['#text']);
						model.set('zest_avg', self.asDollar(zd.zestimate.amount['#text']));
						model.set('zest_high', self.asDollar(zd.zestimate.valuationRange.high['#text']));
						model.set('zest_low', self.asDollar(zd.zestimate.valuationRange.low['#text']));
						model.set('last_sold_date', zd.lastSoldDate ? zd.lastSoldDate['#text'] : 'na');
						model.set('last_sold_price', zd.lastSoldPrice ? '$' + self.asDollar(zd.lastSoldPrice['#text']) : 'na');
						deferred.resolve();
					} else {
						console.log('Error! Zillow says: ' + $(resp.getElementsByTagName('message')).find('text').text());
						deferred.resolve();
					}

				} else {
					alert('Unkown zillow error.');
				}
			});
		// 	ajax.genericCallXML('POST', data, ajax.servers.zillow, ajax.service.zillow.deepSearch, {
		// 		success: function (resp) {
		// 			if (resp) {
		// 				var zd;
		// 				if (resp.getElementsByTagName('result').length) {
		// 					zd = xml.toJSON(resp.getElementsByTagName('result')[0]);
		// 					model.set('zpid', zd.zpid['#text']);
		// 					model.set('baths', zd.bathrooms['#text']);
		// 					model.set('beds', zd.bedrooms['#text']);
		// 					model.set('sqft', zd.finishedSqFt['#text']);
		// 					model.set('lot', zd.lotSizeSqFt['#text']);
		// 					model.set('year_built', zd.yearBuilt['#text']);
		// 					model.set('zest_avg', self.asDollar(zd.zestimate.amount['#text']));
		// 					model.set('zest_high', self.asDollar(zd.zestimate.valuationRange.high['#text']));
		// 					model.set('zest_low', self.asDollar(zd.zestimate.valuationRange.low['#text']));
		// 					model.set('last_sold_date', zd.lastSoldDate ? zd.lastSoldDate['#text'] : 'na');
		// 					model.set('last_sold_price', zd.lastSoldPrice ? '$' + self.asDollar(zd.lastSoldPrice['#text']) : 'na');
		// 					deferred.resolve();
		// 				} else {
		// 					console.log('Error! Zillow says: ' + $(resp.getElementsByTagName('message')).find('text').text());
		// 					deferred.resolve();
		// 				}
		//
		// 			} else {
		// 				alert('Unkown zillow error.');
		// 			}
		// 		},
		// 		error: function (resp) {
		// 			console.error(resp);
		// 			deferred.resolve();
		// 		}
		// 	});
			return deferred;
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
		asDollar: function (n) {
			n = parseInt(n);
			return n.toFixed(2).replace(/./g, function(c, i, a) {
			    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
			});
			// body...
		},
		getPropertyImage: function (link) {
			var get_req = ajax.proxyGet(link).done( function (resp) {
				resp = resp.documentElement.childNodes[0].nodeValue
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
		// getPropertyImage: function (link) {
		// 	var get_req = $.get(link).done( function (resp) {
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
	});

	return View;
});
