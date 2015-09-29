define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var Model = Backbone.Model.extend({
		defaults: {
			path: 'signup',
			id: -1,
			email: '',
			password: ''
		}
	});

	return Model;
});