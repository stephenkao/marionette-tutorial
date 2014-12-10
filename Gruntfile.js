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
					ignores: [
						'javascripts/lib',
						'javascripts/test'
					],
					force: true
				},
				dev: {
					src: ['javascripts']
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

			////////// Soy
			soy: {
				templates: {
					src: ['closure/**/*.soy'],
					outputPathFormat: 'template/{INPUT_DIRECTORY}/{INPUT_FILE_NAME}.js'
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
						'jshint'
					]
				},
				sass: {
					files: [
						'scss/**/*.scss'
					],
					tasks: [
						'compass:dev'
					]
				},
				soy: {
					files: [
						'closure/**/*.soy'
					],
					tasks: [
						'closureSoys:all'
					]
				}
			},
			concurrent: {
				options: {
					logConcurrentOutput: true
				},
				tasks: [
					'watch:javascript',
					'watch:sass',
					'watch:soy'
				]
			}
		});

		grunt.loadNpmTasks('grunt-contrib-requirejs');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-jscs');
		grunt.loadNpmTasks('grunt-concurrent');
		grunt.loadNpmTasks('grunt-notify');
		grunt.loadNpmTasks('grunt-soy');

		////////// Development mode
		grunt.registerTask('dev', [
			'concurrent'
		]);
		////////// 'Production' mode
		grunt.registerTask('production', [
			'compass:dev',
			'jshint:dev'
		]);
	};
})();
