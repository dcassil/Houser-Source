define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var PropertyModel = Backbone.Model.extend({
		defaults: {
			id: -1,
			address: '',
			city: '',
			state: 'OK'
		},
		initialize: function (options) {
			var self = this;

			self.set('id', self.get('AccountNumber'));
			//console.log(options);
			self.SetAddressValues(options);
			//console.log(this)
		},
		SetAddressValues: function (options) {
			var self = this,
				_address = options.Address,
				_city = self.getCity(_address);

			self.set('city', _city.trim());
			self.set('address', _address.replace(_city, '').replace(',', '').trim());
		},
		getCity: function (address) {
			var self = this,
				_city = 'n/a';

			_.each(['OKLAHOMA CITY', 'EDMOND', 'HARRAH', 'CHOCTAW', 'DEL CITY', 'MIDWEST CITY'], function (city) {
				if (address.indexOf(city) !== -1) {
					_city = city;
					return _city;
				}
			});
			return _city;
		}
	});

	return PropertyModel;
});
