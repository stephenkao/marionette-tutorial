/*global define */

/**
 * A Behavior that allows for Ganttification (project level)
 */
define([
	// Libraries
	'underscore',
	'backbone.marionette',
	'lib/d3'
], function (
	// Libraries
	_,
	Marionette,
	d3
) {
	'use strict';

	////////// Type definitions
	/**
	 * @typedef {!{title: !string, startTime: number, endTime: number}}
	 * typedef for 'TaskRecord'
	 */

	var GanttBehavior = Marionette.Behavior.extend({

		////////// Initialization
		defaults: {
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
			tasks: [],
			// The intended selector of the element in which the graph will be rendered
			selector: ''
		},
		initialize: function () {
			this.listenTo(this.view, 'tasks:set', this.onTasksSet);
		},

		////////// Bookkeeping
		/**
		 * Set the tasks for this Gantt chart,
		 * thereby setting off a cataclysmic chain reaction of (re-)initialization!!!
		 *
		 * @param {!Array.<!TaskRecord>} tasks
		 */
		onTasksSet: function (tasks) {
			this.options.tasks = tasks;
			this.redraw();
		},
		/**
		 * Initialize the time domain, given all the tasks
		 *
		 * VOID->VOID
		 */
		_initializeTimeDomain: function () {
			var tasks = this.options.tasks;

			tasks.sort(function(a, b) {
				return a.endTime - b.endTime;
			});
			this.options.timeRange.end = tasks[tasks.length - 1].endTime;

			tasks.sort(function(a, b) {
				return a.startTime - b.startTime;
			});
			this.options.timeRange.start = tasks[0].startTime;
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
			this.svg.append('g')
				.attr('class', 'grid')
				.transition()
				.call(function () {
					return d3.svg.axis()
						.scale(this.xScale)
						.orient('top')
						.ticks(d3.time.days);
					}.bind(this)()
					.tickSize(-this.options.height, 0, 0)
					.tickFormat(''));
			this.svg.selectAll('.grid line')
				.attr('stroke-dasharray', '4, 10')
				.attr('y1', 0)
				.attr('y2', this.options.height - this.options.margin.bottom);
		},
		/**
		 * Render the x-axis of this graph
		 *
		 * VOID->VOID
		 */
		_drawAxes: function () {
			this.svg.append('g')
				.attr('class', 'axis--x')
				.attr('transform', 'translate(0, 0)')
				.transition()
				.call(this.xAxis);
		},
		/**
		 * Render the actual tasks of this graph
		 *
		 * VOID->VOID
		 */
		_drawTasks: function () {
			// TODO: Add a key function for quick references
			var svgTasks = this.svg.selectAll('.chart').data(this.options.tasks).enter().append('g')
				.attr('class', 'task')
				.attr('transform', function (taskDatum) {
					return 'translate(' + this.xScale(taskDatum.startTime) + ', ' + this.yScale(taskDatum.title) + ')';
				}.bind(this))
				.attr('width', function(taskDatum) {
					return (this.xScale(taskDatum.endTime) - this.xScale(taskDatum.startTime));
				}.bind(this));

			// Render task rectangles
			svgTasks.append('rect')
				.attr('class', function(taskDatum) {
					return taskDatum.title;
				})
				.attr('height', function() {
					return this.yScale.rangeBand();
				}.bind(this))
				.attr('width', function(taskDatum) {
					return (this.xScale(taskDatum.endTime) - this.xScale(taskDatum.startTime));
				}.bind(this));

			// Render task labels
			svgTasks.append('text')
				.attr('x', '1em')
				.attr('y', '16') // HACK
				.classed('zeta', true)
				.style('text-transform', 'uppercase')
				.style('fill', 'white')
				.text(function(taskDatum) {
					return taskDatum.title;
				});
		},
		/**
		 * Render the spotlight that highlights today in this graph
		 *
		 * VOID->VOID
		 */
		_drawSpotlight: function () {
			var today = new Date(),
				tomorrow = new Date(today.getTime() + 60 * 60 * 24 * 1000),
				dayWidth = this.xScale(tomorrow) - this.xScale(today);
			this.svg.append('rect')
				.attr('class', 'spotlight')
				.attr('transform', 'translate(' + this.xScale(new Date().getTime()) + ', 0)')
				.attr('width', dayWidth)
				.attr('height', this.options.height)
				.style('fill', 'yellow')
				.style('opacity', 0.4);
		}
	});

	return GanttBehavior;
});
