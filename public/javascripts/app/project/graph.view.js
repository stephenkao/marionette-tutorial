/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'lib/d3',
	'backbone.marionette',
	// Components
	'app/marionetteApp',
	// Singletons
	'singleton/stringUtils',
	// Templates
	'templates/lesir/components/project/graph',
	// Non-returning
	'lib/gantt-chart-d3v2'
], function (
	// Libraries
	d3,
	Marionette,
	// Components
	MarionetteApp,
	// Singletons
	stringUtils
) {
	'use strict';

	var GraphView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.project.graph,
		initialize: function () {
			this.listenTo(MarionetteApp, 'project:dom:added', this.onDomAdded);
			this.listenTo(this.model.get('phases'), 'reset', this.onDomAdded);
		},

		onDomAdded: function () {
			var phaseCollection = this.model.get('phases');

			if (!phaseCollection.length) {
				return;
			}

			var gantt = d3.gantt('.js_graph-region')
				    .taskTypes(phaseCollection.pluck('title'))
				    .taskStatus(phaseCollection.pluck('status'));

			gantt(phaseCollection.models.map(function(model) {
				return model.attributes;
			}));
		}

	});


	return GraphView;
});
