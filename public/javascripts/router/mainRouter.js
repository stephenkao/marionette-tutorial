/*global define, require */
define([
	// Libraries
	'backbone'
], function (
	// Libraries
	Backbone
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
			// Default
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
			require(['app/list/list.app'], function (listApp) {
				listApp.initialize();
			});
		},
		/**
		 * Start up the 'yearbook' page app
		 *
		 * VOID->VOID
		 */
		initializeYearbookPageApp: function () {
			require(['app/yearbook/yearbook.app'], function (yearbookApp) {
				yearbookApp.initialize();
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
				ProjectApp.initialize(projectId);
			});
		},
		/**
		 * Start up the 'Gantt' page app
		 *
		 * VOID->VOID
		 */
		initializeGanttPageApp: function () {
			require(['app/gantt/gantt.app'], function (GanttApp) {
				GanttApp.initialize();
			});
		}
	});

	return MainRouter;
});
