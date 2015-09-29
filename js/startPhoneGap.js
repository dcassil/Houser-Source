require(['js/core', 'js/Libs/phone_gap'], function(core, phoneGap) {
	'use strict';
	if (window.houser_loaded){ return; }
	phoneGap.initialize();
	window.houser_loaded = true;
	core.init();
});
