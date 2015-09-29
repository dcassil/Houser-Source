define([
	'Views/SubViewSuper',
	'text!Templates/property_lists.tmpl',
	'Models/Property_List',
	'Collections/Property',
	'Collections/Property_List',
	'js/ajax',
	'js/Data_Utils/Property'
], function (SubView, _template, Model, PropertyCollection, Collection, ajax, tps) {
	'use strict';

	var View = SubView.extend({

		events: {
			'click .houser_prop_list': 'loadPropertyListClick'
		},

		el: $('.wrapper'),
		selector: '.wrapper',
		template: _.template(_template),
		property_list_collections: new Collection(),

		/**
		@Description:	Initialize the view.
		**/
		initialize: function (options) {
			var self = this;

			options = options || {};

			// $('head').append('<iframe id=sherif_hack src="http://oklahomacounty.org/sheriff/SheriffSales/"></iframe>');
			// $('#sherif_hack').on('load', function () {
			// 	console.log(this);
			// 	console.log($('#sherif_hack').html());
			// })

			self.getAllProperties().done(function (data) {
				//console.log(data);
				self.makeCollections(data);
				self.render();
			});
		},
		render: function () {
			var self = this;

			$(self.selector).html(self.template({lists: self.property_list_collections.models}));
		},

		getAllProperties: function () {
			var deferred = $.Deferred(),
				properties = {};

			tps.getSherifSaleDates().done(function (dates) {
				console.log(dates);
				_.each(dates, function (date) {
					tps.getSherifSaleRecordForDate(date).done(function (data) {
						console.log(data);
						properties[date] = data.Properties;
					}).fail(function (data) {
						deferred.reject(data);
					})
				})
				deferred.resolve(properties);
			});

			return deferred;
		},

		makeCollections: function (data) {
			var self = this,
				parse_prop_collection = [];

			_.each(data, function(list, key) {
				self.property_list_collections.add(
					new Model({
						id: key,
						name: key,
						properties: new PropertyCollection(list)
					})
				);

				 _.each(list, function(item) {
					 var parsePropertyObject = new Parse.Object('properties', item);
					 parsePropertyObject.save({key: key});
					 parse_prop_collection.push(parsePropertyObject);
				 })
				var parsePropertyCollection = new Parse.Object('PropertyCollections');
				parsePropertyCollection.add(parse_prop_collection);
				parsePropertyCollection.save({key: key});
			});

			//console.log(self.property_list_collections);
		},

		// EVENT FUNCTIONS

		loadPropertyListClick: function (e) {
			var self = this,
				target = $(e.target),
				li_el = target.closest('li'),
				list;

				HOUSER.current_list = self.property_list_collections.findWhere({id: li_el.data("list")});
				HOUSER.router.navigate('property_list', {trigger: true});
		}
	});

	return View;
});
