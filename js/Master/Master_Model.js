define([
], function () {
	'use strict';

	var MasterModel = Backbone.Model.extend({
		defaults: {
			id: -1,
			title: "Houser",
			description: 'a description.... need to hire a copy writer.',
			author: "Daniel Cassil",
			version: "0.1.0",
			current_sub_view: null
		}
	});

	return MasterModel;
});