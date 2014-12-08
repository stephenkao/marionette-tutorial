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

			////////// Development cycle
			notify: {
				compass: {
					options: {
						title: 'Compass task complete',
						message: 'CSS files generated, no errors found'
					}
				}
			},
			watch: {
				options: {
					spawn: false,
					interval: 5007
				},

				javascript: {
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
			},
			concurrent: {
				options: {
					logConcurrentOutput: true
				},
				tasks: [
					'watch:javascript',
					'watch:sass'
				]
			}
		});

		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-concurrent');
		grunt.loadNpmTasks('grunt-notify');

		////////// Development mode
		grunt.registerTask('run', [
			'concurrent'
		]);
		////////// 'Production' mode
		grunt.registerTask('production', [
			'compass:dev',
			'jshint:dev'
		]);
	};
})();
