/*global define, lesir */

/**
 * A page application that manages the 'gantt' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/marionetteApp',
	'collection/roadmap.collection',
	'app/gantt/roadmapList.view',
	'app/gantt/graph.view',
	// Templates
	'templates/lesir/components/gantt/app'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	RoadmapCollection,
	RoadmapChartView,
	GraphView
) {
	'use strict';

	var GanttAppLayout = Marionette.Layout.extend({

		////////// App components
		projectCollection: null,
		roadmapListView: null,

		////////// Initialization
		className: 'app app--gantt',
		template: lesir.components.gantt.app,
		regions: {
			contentRegion: '.content-region'
		},
		/**
		 * Initialize the app-specific components
		 *
		 * VOID->VOID
		 */
		initialize: function () {
			this.roadmapCollection = new RoadmapCollection();
			this.roadmapChartView = new RoadmapChartView({
				collection: this.roadmapCollection
			});
		},
		onRender: function () {
			this.contentRegion.show(this.roadmapListView);
			this.roadmapCollection.fetch({reset: true});
		}

	});

	return GanttAppLayout;
});
