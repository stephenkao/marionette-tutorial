/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'underscore',
	'backbone.marionette',
	'lib/d3',
	'lib/xdate',
	// Components
	'app/marionetteApp',
	// Behaviors,
	'view/behavior/gantt.behavior',
	// Templates
	'templates/lesir/components/project/graph'
], function (
	// Libraries
	_,
	Marionette,
	d3,
	XDate,
	// Components
	MarionetteApp,
	// Behaviors
	GanttBehavior
) {
	'use strict';

	var GraphView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.project.graph,
		behaviors: {
			GanttBehavior: {
				behaviorClass: GanttBehavior,
				margin: {
					top: 30,
					right: 0,
					bottom: 30,
					left: 0
				},
				selector: '.js_graph-region'
			}
		},
		initialize: function () {
			this.listenTo(this, 'dom:added', this.onDomAdded);
		},

		serializeData: function () {
			var project = this.model.attributes,
				startDate = new XDate(project.startTime),
				endDate = new XDate(project.endTime);

			return {
				project: {
					title: project.title,
					priority: project.priority,
					users: project.users,
					memo: project.memo
				},
				roadmapTitle: project.roadmap.title,
				startDate: startDate.toString('MM / dd / yy'),
				endDate: endDate.toString('MM / dd / yy'),
				duration: Math.ceil(startDate.diffMonths(endDate))
			};
		},

		onDomAdded: function () {
			var taskCollection = this.model.get('tasks');

			if (!taskCollection.length) {
				return;
			}

			this.trigger('tasks:set', taskCollection.models.map(function (model) {
				return model.attributes;
			}));
		}
	});


	return GraphView;
});
