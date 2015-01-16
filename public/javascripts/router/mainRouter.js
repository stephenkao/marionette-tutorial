/*global define, require */
define([
	// Libraries
	'backbone',
	// Components
	'app/marionetteApp'
], function (
	// Libraries
	Backbone,
	// Components
	MarionetteApp
) {
	'use strict';

	var MainRouter = Backbone.Router.extend({
		// Set up the static routes
		routes: {
			// Specific page applications
			'list': 'initializeListPageApp',
			'yearbook': 'initializeYearbookPageApp',
			'project/:id': 'initializeProjectPageApp',
			'gantt': 'initializeGanttPageApp',
			// Default -- go to 'list' view
			'': 'initializeListApp'
		},

		// The following four functions just require the corresponding *.app.js file
		// and initialize the included page application.  No muss, no fuss!
		// This *could* technically be simplified to one function,
		// but I am an avid proponent of transparency (especially in tutorials).
		/**
		 * Start up the 'list' page app
		 *
		 * VOID->VOID
		 */
		initializeListPageApp: function () {
			require(['app/list/list.app'], function (ListApp) {
				var listApp = new ListApp();
				MarionetteApp.contentRegion.show(listApp);
				MarionetteApp.trigger('list:dom:added');
			});
		},
		/**
		 * Start up the 'yearbook' page app
		 *
		 * VOID->VOID
		 */
		initializeYearbookPageApp: function () {
			require(['app/yearbook/yearbook.app'], function (YearbookApp) {
				var yearbookApp = new YearbookApp();
				MarionetteApp.contentRegion.show(yearbookApp);
				MarionetteApp.trigger('yearbook:dom:added');
			});
		},
		/**
		 * Start up the 'project' page app
		 * NOTE: This takes a route parameter!
		 *
		 * @param {!string} projectId
		 */
		initializeProjectPageApp: function (projectId) {
			require(['app/project/project.app'], function (ProjectApp) {
				var projectApp = new ProjectApp({id: projectId});
				MarionetteApp.contentRegion.show(projectApp);
				MarionetteApp.trigger('project:dom:added');
			});
		},
		/**
		 * Start up the 'Gantt' page app
		 *
		 * @param {!string} projectId
		 */
		initializeGanttPageApp: function (projectId) {
			require(['app/gantt/gantt.app'], function (GanttApp) {
				var projectApp = new GanttApp({id: projectId});
				MarionetteApp.contentRegion.show(projectApp);
				MarionetteApp.trigger('project:dom:added');
			});
		}
	});

	return MainRouter;
});
