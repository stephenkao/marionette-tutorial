/*global define */

/**
 * A page application that manages the 'list' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/marionetteApp',
	'app/list/projectList.view',
	'collection/project.collection'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	ProjectListView,
	ProjectCollection
) {
	'use strict';

	var ListApp, listApp;

	ListApp = Marionette.Controller.extend({
		projectCollection: null,

		initialize: function () {
			var projectCollection, projectListView;

			projectCollection = new ProjectCollection();
			projectListView = new ProjectListView({
				collection: projectCollection
			});
			projectCollection.fetch({reset: true});
			window.projectCollection = projectCollection;
			MarionetteApp.contentRegion.show(projectListView);
		}
	});

	listApp = new ListApp();

	return listApp;
});
