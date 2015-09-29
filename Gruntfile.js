/*
*	Houser build tasks
*
*/
module.exports = function (grunt) {
	var DEST = '../Houser/www/';

	// Set command-line option defaults.
	grunt.option('target', grunt.option('target') || 'dev');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			options: {
				namespace: 'HOUSER',
				mainConfigFile: 'config.js',
				name: './js/main',
				include: 'require_lib',
				findNestedDependencies: true,
				keepBuildDir: true
			},
			prod: {
				options: {
					preserveLicenseComments: false,
					out: DEST + 'js/houser.js'
				}
			},
			dev: {
				options: {
					optimize: 'none',
					out: DEST + 'js/houser.js'
				}
			}
		},
		watch: {
			js : {
				files: ['**/*.js', '**/*.tmpl', '!**/node_modules/**'],
				tasks: ['build']
			},
			css : {
				files: ['**/*.css','!**/node_modules/**'],
				tasks: ['build']
			}
		},
		copy: {
			documents: {
				src: 'mobile.html',
				dest: DEST + 'index.html'
			},
			require: {
				src: './js/Libs/require.js',
				dest: DEST + 'js/require.js'
			}
		},
		clean: {
			documents: {
				src: DEST + 'index.html',
				options: { force: true }
			}
		},
		concat: {
			options: {
				separator: ' '
			},
			dev: {
				src: ['./css/*.css', './css/Views/*.css'],
				dest: DEST + 'css/houser.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-newer');
	

	grunt.registerTask('default', function () {
		grunt.log.write('Hello Houser');
	});

	grunt.registerTask('build', ['clean:documents', 'concat:dev', 'requirejs:dev', 'copy:require', 'copy:documents']);

	// Copy all files to tmp, replace devbox urls, build (minify), copy license txt, add header comment to js file, remove all temp files.
	grunt.registerTask('build-prod', ['requirejs:prod', 'copy:documents', 'copy:require', 'copy:documents']);
};
