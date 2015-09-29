define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var Model = Backbone.Model.extend({
		defaults: {
			path: 'signin',
			id: -1,
			email: '',
			password: '',
			name: ''
		}
	});

	return Model;
});