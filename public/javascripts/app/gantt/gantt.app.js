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
	'collection/roadmap.collection',
	'app/gantt/roadmapGraph.view',
	// Templates
	'templates/lesir/components/gantt/app'
], function (
	// Libraries
	Marionette,
	// Components
	RoadmapCollection,
	RoadmapGraphView
) {
	'use strict';

	var GanttAppLayout = Marionette.Layout.extend({

		////////// App components
		roadmapCollection: null,
		roadmapChartView: null,

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
			this.roadmapChartView = new RoadmapGraphView({
				collection: this.roadmapCollection
			});
		},
		onRender: function () {
			this.contentRegion.show(this.roadmapChartView);
			this.roadmapCollection.fetch({reset: true});
		}
	});

	return GanttAppLayout;
});
