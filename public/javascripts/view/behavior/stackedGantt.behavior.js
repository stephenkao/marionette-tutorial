/*global define */

/**
 * A Behavior that allows for Ganttification (roadmap level)
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

	var StackedGanttBehavior = Marionette.Behavior.extend({

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
			roadmaps: [],
			// The intended selector of the element in which the graph will be rendered
			selector: ''
		},
		initialize: function () {
			this.listenTo(this.view, 'roadmaps:set', this.onRoadmapsSet);
		},

		////////// Bookkeeping
		/**
		 * Set the roadmaps to redraw this Gantt chart
		 *
		 * @param {!Array.<!RoadmapRecord>} roadmaps
		 */
		onRoadmapsSet: function (roadmaps) {
			this.options.roadmaps = roadmaps;
			this.redraw();
		},

		/**
		 * Initialize the time domain, given all projects
		 *
		 * VOID->VOID
		 */
		_initializeTimeDomain: function () {
			var projects = _.flatten(_.pluck(this.options.roadmaps, 'projects'));

			projects.sort(function(a, b) {
				return a.endTime - b.endTime;
			});
			this.options.timeRange.end = projects[projects.length - 1].endTime;

			projects.sort(function(a, b) {
				return a.startTime - b.startTime;
			});
			this.options.timeRange.start = projects[0].startTime;
		},
		/**
		 * Initialize the axes and scale functions
		 *
		 * VOID->VOID
		 */
		_initializeAxes: function () {
			var today = new Date().getTime(),
				monthSpan = 60 * 60 * 24 * 7 * 4,
				projects = _.flatten(_.pluck(this.options.roadmaps, 'projects')),
				projectTitles = _.pluck(projects, 'title');

			this.xScale = d3.time.scale()
				.domain([this.options.timeRange.start, this.options.timeRange.end])
//				.domain([today - (2 * monthSpan), today + (2 * monthSpan)])
				.range([0, this.options.width]).clamp(true);

			this.yScale = d3.scale.ordinal()
				.domain(projectTitles)
				.rangeRoundBands([0, this.options.height], 0.4);

			this.yAxis = d3.svg.axis()
				.scale(this.yScale)
				.orient('left')
				.tickSize(0)
				.tickValues(projectTitles);

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
					width, height,
					totalProjects = _.flatten(_.pluck(this.options.roadmaps, 'projects'));

				// Derive the estimated height and width of the graph
				width = this.options.width = parseInt(selection.style('width'), 10);
				// @TODO: Do this better!!!!
				height = this.options.height = Math.max(totalProjects.length * 10, parseInt(selection.style('height'), 10));

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
						.ticks(d3.time.months);
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
				.attr('class', 'axis--y')
				.transition()
				.call(this.yAxis);

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
		_drawTasks: function () {},
		/**
		 * Render the spotlight that highlights today in this graph
		 *
		 * VOID->VOID
		 */
		_drawSpotlight: function () {}
	});

	return StackedGanttBehavior;
});
