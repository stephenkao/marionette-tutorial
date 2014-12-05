/*global module, require */

/**
 * Marionette tutorial Gruntfile
 * DON'T TOUCH THIS, YOU DAMN, DIRTY APES!
 */
(function() {
	'use strict';

	module.exports = function (grunt) {
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),

			////////// JavaScript
			jshint: {
				options: {
					jshintrc: '.jshintrc',
					reporter: require('jshint-stylish'),
					reporterOutput: 'output/contrib-jshint.xml',
					force: true
				},
				dev: {
					src: [
						'javascripts',
						'!javascripts/lib'
					]
				}
			},

			////////// CSS
			scsslint: {
				options: {
					bundleExec: false,
					config: '.scss-lint.yml',
					reporterOutput: 'output/scss-lint-report.xml',
					colorizeOutput: true,
					maxBuffer: Infinity,
					force: true
				},
				dev: {
					src: [
						'scss'
					]
				}
			},
			compass: {
				dev: {
					options: {
						sassDir: 'scss',
						cssDir: 'css'
					}
				}
			},

			watch: {
				options: {
					spawn: false,
					interval: 5007
				},

				js: {
					files: [
						'javascripts/**/*.js',
						'!javascripts/lib/**/*.js'
					],
					tasks: [
						'jshint:dev'
					]
				},
				sass: {
					files: [
						'scss/**/*.scss'
					],
					tasks: [
						'compass:dev'
					]
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-watch');

		grunt.registerTask('default', [
			'compass:dev',
			'jshint:dev'
		]);
		grunt.registerTask('run', [
			'watch:sass',
			'watch:js'
		]);
	};
})();
