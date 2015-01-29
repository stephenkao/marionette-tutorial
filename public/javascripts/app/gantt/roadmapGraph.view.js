/*global define, lesir, window */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Behaviors
	'view/behavior/stackedGantt.behavior',
	// Templates
	'templates/lesir/components/gantt/graph'
], function (
	// Libraries
	Marionette,
	// Behaviors
	StackedGanttBehavior
) {
	'use strict';

	var RoadmapChartView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.gantt.graph,
		behaviors: {
			StackedGanttBehavior: {
				behaviorClass: StackedGanttBehavior,
				selector: '.js_graph-region'
			}
		},
		collectionEvents: {
			reset: 'onCollectionReset'
		},
		initialize: function () {
			this.listenTo(this, 'dom:added', this.onDomAdded);
		},

		onCollectionReset: function () {
			var roadmapCollection = this.collection;

			if (!roadmapCollection.length) {
				return;
			}

			// This is a bit of a workaround to recursively JSONify Model/Collection data
			this.trigger('roadmaps:set', window.JSON.parse(window.JSON.stringify(roadmapCollection)));
		}
	});

	return RoadmapChartView;
});
