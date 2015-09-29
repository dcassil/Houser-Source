define([
], function () {
	'use strict';

	var SubView = Backbone.View.extend({
		remove: function() {
			this.$el.empty().off(); /* off to unbind the events */
			this.stopListening();
			return this;
		}
	});

	return SubView;
});
