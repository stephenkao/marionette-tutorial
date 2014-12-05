/*global module */

/**
 * Marionette tutorial Gruntfile
 * DON'T TOUCH THIS, YOU DAMN, DIRTY APES!
 */
(function () {
	'use strict';

	module.exports = function (grunt) {
		grunt.initConfig({
			pkg: grunt.file.readJson('package.json'),

			////////// CSS
			compass: {
				dev: {
					options: {
						sassDir: 'scss',
						cssDir: 'css'
					}
				}
			},

			watch: {
				sass: {
					files: ['scss/**/*.scss'],
					tasks: ['compass:dev']
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-watch');

		grunt.registerTask('compile', ['compass']);
		grunt.registerTask('default', 'watch');
	};
});
