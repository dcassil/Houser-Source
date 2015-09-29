require.config({
	paths: {
		Master: 'js/Master',
		Models: 'js/Models/',
		Views: 'js/Views/',
		Collections: 'js/Collections/',
		Templates: 'js/Templates/',
		require_lib: 'js/Libs/require',
		jquery: 'js/Libs/jquery-2.1.4', // AMD support
		underscore: 'js/Libs/underscore-1.8.3', // 1.8.3 AMD support
		backbone: 'js/Libs/backbone-1.2.1', // 1.1.2 AMD support
		text: 'js/Libs/text',
		jqmobile: 'js/Libs/jquery_mobile'
	},
	shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
	}
});
