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
	// Templates
	'templates/lesir/components/project/graph',
	// Non-returning
	'lib/gantt-chart-d3v2'
], function (
	// Libraries
	_,
	Marionette,
	d3,
	XDate,
	// Components
	MarionetteApp
) {
	'use strict';

	var GraphView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.project.graph,
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
				roadmap: {
					title: "WHATEVER"
				},
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

			var gantt = d3.gantt('.js_graph-region')
					.taskTypes(taskCollection.pluck('title'));

			gantt(taskCollection.models.map(function(model) {
				return model.attributes;
			}));
		}
	});


	return GraphView;
});
