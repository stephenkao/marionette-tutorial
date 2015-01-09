/*global define, lesir */

/**
 * A page application that manages the 'project' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/marionetteApp',
	'model/project.model',
	'app/project/updateList.view',
	// Templates
	'templates/lesir/components/project/app'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	ProjectModel,
	UpdateListView
) {
	'use strict';

	var ProjectAppLayout = Marionette.Layout.extend({

		////////// App components
		className: 'app app--project',
		template: lesir.components.project.app,
		regions: {
			timelineRegion: '.timeline-region',
			documentationRegion: '.documentation-region',
			historyRegion: '.history-region'
		},

		////////// Initialization
		/**
		 * Initialize the app-specific components
		 *
		 * @param {number} projectId
		 */
		initialize: function (projectId) {
			this.projectModel = new ProjectModel(projectId);
			this.updateListView = new UpdateListView({collection: this.projectModel.get('updates')});
		},
		onRender: function () {
			var that = this;
			this.projectModel.fetch().done(function () {
				console.log(that.projectModel.attributes);
			});
			this.historyRegion.show(this.updateListView);
		}
	});

	return ProjectAppLayout;
});
