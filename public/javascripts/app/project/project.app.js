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
	'app/project/graph.view',
	'app/project/documentation.view',
	'app/project/updateList.view',
	// Templates
	'templates/lesir/components/project/app'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	ProjectModel,
	GraphView,
	DocumentationView,
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

			this.listenTo(this.projectModel, 'sync', function () {
				this.onModelFetch();
			}.bind(this));

			this.graphView = new GraphView({
				model: this.projectModel
			});
			this.documentationView = new DocumentationView({
				model: this.projectModel
			});
			this.updateListView = new UpdateListView({
				collection: this.projectModel.get('updates')
			});

			this.projectModel.fetch();
		},
		onModelFetch: function () {
			this.timelineRegion.show(this.graphView);
			// HACK
			this.graphView.trigger('dom:added');
			this.documentationRegion.show(this.documentationView);
			this.historyRegion.show(this.updateListView);
		}
	});

	return ProjectAppLayout;
});
