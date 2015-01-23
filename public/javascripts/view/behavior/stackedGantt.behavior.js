/*global define */

/**
 * A Behavior that allows for Ganttification (roadmap level)
 */
define([
	// Libraries
	'underscore',
	'lib/d3',
	'lib/backbone.marionette'
], function (
	// Libraries
	_,
	d3,
	Marionette
) {
	'use strict';

	var StackedGanttBehavior = Marionette.Behavior.extend({

		////////// Initialization
		defaults: {
			// The top-level <svg> d3 selection
			svg: null,
			// The intended height and width of this.svg
			height: 0,
			width: 0,
			// The intended margin of this.svg
			margin: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			},
			timeRange: {
				start: 0,
				end: 0
			},
			projects: [],
			// The intended selector of the element in which the graph will be rendered
			selector: ''
		},
		initialize: function () {
			this.listenTo(this.view, 'projects:set', this.onProjectsSet);
		},

		////////// Bookkeeping
		/**
		 * Set the projects for this Gantt chart
		 * and initialize all that good schtuff.
		 *
		 * @param {!Array.<!ProjectRecord>}
		 */
		onProjectsSet: function (projects) {
			this.options.projects = projects;
			this.redraw();
		},
		/**
		 * Initialize the time domain, given all the tasks
		 *
		 * VOID->VOID
		 */
		_initializeTimeDomain: function () {
			var projects = this.options.projects;

			projects.sort(function(a, b) {
				return a.endDate - b.endDate;
			});
			this.options.timeRange.end = projects[projects.length - 1].endDate;

			projects.sort(function(a, b) {
				return a.startDate - b.startDate;
			});
			this.options.timeRange.start = projects[0].startDate;
		},
		/**
		 * Initialize the axes and scale functions
		 *
		 * VOID->VOID
		 */
		_initializeAxes: function () {
			this.xScale = d3.time.scale()
				.domain([this.options.timeRange.start, this.options.timeRange.end])
				.range([0, this.options.width]).clamp(true);

			this.yScale = d3.scale.ordinal()
				.domain(_(this.options.tasks).pluck('title'))
				.rangeRoundBands([0, this.options.height], 0.4);

			this.xAxis = d3.svg.axis()
				.scale(this.xScale)
				.orient('top')
				.ticks(d3.time.months)
				.tickFormat(function (datum) {
					var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
					return [
						months[datum.getMonth()],
						(datum.getFullYear() + '').slice(2)
					].join(' \'');
				});
		},

		////////// Rendering
		/**
		 * Refresh the SVG components of this graph
		 * (essentially a wrapper around d3's 'redraw')
		 *
		 * VOID->VOID
		 */
		redraw: function () {
			this.options.selector = this.options.selector || this.$el;

			// If this View doesn't have an svg property set,
			// then this is the first call to redraw.
			// Set up the top-level SVG element!
			if (!this.svg) {
				var selection = d3.select(this.options.selector),
					margin = this.options.margin,
					width, height;

				// Derive the estimated height and width of the graph
				width = this.options.width = parseInt(selection.style('width'), 10);
				height = this.options.height = parseInt(selection.style('height'), 10);

				// Add the top-level svg and g elements
				this.svg = selection.append('svg')
					.attr('class', 'chart')
					.attr('viewBox', [0, 0, width, height].join(' '))
					.attr('preserveAspectRatio', 'xMidYMid')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
				    .append('g')
					.attr('class', 'gantt-chart')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom);
			}

			this._initializeTimeDomain();
			this._initializeAxes();

			this._drawGridLines();
			this._drawAxes();
			this._drawTasks();
			this._drawSpotlight();
		},
		/**
		 * Render the dotted grid lines of this graph
		 *
		 * VOID->VOID
		 */
		_drawGridLines: function () {
		},
		/**
		 * Render the x-axis of this graph
		 *
		 * VOID->VOID
		 */
		_drawAxes: function () {
		},
		/**
		 * Render the actual tasks of this graph
		 *
		 * VOID->VOID
		 */
		_drawTasks: function () {
		},
		/**
		 * Render the spotlight that highlights today in this graph
		 *
		 * VOID->VOID
		 */
		_drawSpotlight: function () {
		}
	});

	return StackedGanttBehavior;
});
