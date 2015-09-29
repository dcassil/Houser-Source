define([
	'jquery',
	'underscore',
	'backbone',
	'Models/Property'
], function ($, _, Backbone, Property) {
	'use strict';

	var PropertyCollection = Backbone.Collection.extend({
		model: Property
	});

	return PropertyCollection;
});