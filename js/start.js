require(['js/core'], function(core) {
	'use strict';
	if (window.houser_loaded){
		return;
	}
	window.houser_loaded = true;
	core.init();
});
