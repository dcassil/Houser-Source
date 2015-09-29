define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var Model = Backbone.Model.extend({
		defaults: {
			id: -1,
			name: '',
			properties: null,
			type: 1
		},
		initialize: function (options) {
			//console.log(options);
		}
	});

	return Model;
});
