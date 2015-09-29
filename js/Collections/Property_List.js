define([
	'jquery',
	'underscore',
	'backbone',
	'Models/Property_List'
], function ($, _, Backbone, PropertyList) {
	'use strict';

	var PropertyListCollection = Backbone.Collection.extend({
		model: PropertyList
	});

	return PropertyListCollection;
});
