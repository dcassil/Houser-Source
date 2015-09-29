define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	'use strict';

	var WelcomeModel = Backbone.Model.extend({
		defaults: {
			id: -1,
			title: "Houser",
			description: 'a description.... need to hire a copy writer.',
			author: "Daniel Cassil",
			version: "0.1.0"
		}
	});

	return WelcomeModel;
});