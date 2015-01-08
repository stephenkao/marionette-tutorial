
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
						'public/javascripts/lib',
						'public/javascripts/test'
					],
					force: true
				},
				dev: {
					src: ['public/javascripts']
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
					src: ['build/tiger/scss']
				}
			},
			compass: {
				dev: {
					options: {
						sassDir: 'build/tiger/scss',
						cssDir: 'target/css'
					}
				}
			},

			////////// Soy
			soy: {
				build: {
					src: ['app/**/*.soy'],
					inputPrefix: 'app/views/closure/',
					outputPathFormat: 'target/templates/{INPUT_DIRECTORY}/{INPUT_FILE_NAME_NO_EXT}.js',
					classpath: 'app/views/closure/SoyToJsSrcCompiler.jar',
					codeStyle: 'stringbuilder',
					shouldGenerateJsdoc: false,
					shouldProvideRequireSoyNamespaces: false,
					compileTimeGlobalsFile: undefined,
					shouldGenerateGoogMsgDefs: false,
					bidiGlobalDir: 0,
					googMsgsAreExternal: true,
					isUsingIjData: true,
					shouldDeclareTopLevelNamespaces: undefined,
					useGoogIsRtlForBidiGlobalDir: false
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
					interval: 5007,
					debounceDelay: 500
				},

				javascript: {
					files: [
						'public/javascripts/**/*.js',
						'!public/javascripts/lib/**/*.js'
					],
					tasks: [
						'jshint'
					]
				},
				sass: {
					files: [
						'build/tiger/scss/**/*.scss'
					],
					tasks: [
						'compass:dev'
					]
				},
				soy: {
					files: [
						'app/**/*.soy'
					],
					tasks: [
						'soy:build'
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
					'watch:soy',
					'nodemon:run'
				]
			},
			nodemon: {
				run: {
					script: 'server.js'
				}
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
		grunt.loadNpmTasks('grunt-nodemon');

		////////// 'Development' mode
		grunt.registerTask('run', function () {
			// Generate all existing assets
			grunt.task.run('production');

			grunt.task.run('concurrent');
		});

		////////// 'Production' mode
		grunt.registerTask('production', [
			'compass:dev',
			'jshint:dev',
			'soy:build'
		]);
	};
})();
