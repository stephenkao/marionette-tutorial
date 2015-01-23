/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var RoadmapChartView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.gantt.roadmap,
		behaviors: {
			StackedGanttBehavior: {
			}
		}
	});

	return RoadmapChartView;
});
