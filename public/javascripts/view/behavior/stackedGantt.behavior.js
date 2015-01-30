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
				top: 30,
				right: 0,
				bottom: 30,
				left: 250
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
			var projects = _.flatten(_.pluck(this.options.roadmaps, 'projects')),
				projectTitles = _.pluck(projects, 'title');

			this.xScale = d3.time.scale()
				.domain([this.options.timeRange.start, this.options.timeRange.end])
				.range([0, this.options.width]).clamp(true);

			this.yScale = d3.scale.ordinal()
				.domain(projectTitles)
				.rangeRoundBands([0, this.options.height], 0.6);

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
					totalWidth, totalHeight,
					width, height,
					totalProjects = _.flatten(_.pluck(this.options.roadmaps, 'projects'));

				// Derive the estimated height and width of the graph
				width = totalWidth = parseInt(selection.style('width'), 10);
				width = width - margin.left - margin.right;
				this.options.width = width;
				// @TODO: Do this better!!!!
				height = totalHeight = Math.max(totalProjects.length * 60, parseInt(selection.style('height'), 10));
				height = height - margin.top - margin.bottom;
				this.options.height = height;

				// Add the top-level svg and g elements
				this.svg = selection.append('svg')
					.attr('class', 'chart')
					.attr('viewBox', [0, 0, totalWidth, totalHeight].join(' '))
					.attr('preserveAspectRatio', 'xMidYMid')
					.attr('width', totalWidth)
					.attr('height', totalHeight)
				    .append('g')
					.attr('class', 'gantt-chart')
					.attr('width', width)
					.attr('height', height)
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				this.svgZoomable = this.svg.append('g').attr('class', 'zoomable');
			}

			this._initializeTimeDomain();
			this._initializeAxes();

			this._drawGridLines();
			this._drawAxes();
			this._drawTasks();
			this._drawSpotlight();
		},

//		onZoom: function () {
//			this.svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//		},

		/**
		 * Render the dotted grid lines of this graph
		 *
		 * VOID->VOID
		 */
		_drawGridLines: function () {
//			this.svg.append('g')
			this.svgZoomable.append('g')
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

//			this.svg.selectAll('.grid line')
			this.svgZoomable.selectAll('.grid line')
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

			this.svg.selectAll('.axis--y text')
				.attr('class', 'alpha')
				.style('text-transform', 'uppercase');

//			this.svg.append('g')
			this.svgZoomable.append('g')
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
			// Make a pseudo-reverse-lookup from task to project (title)
			var that = this,
				projects = _.flatten(_.pluck(that.options.roadmaps, 'projects')),
				tasks = [],
				svgTaskContainer,
				svgTasks;

			// @TODO: Add task-less roadmaps as projects
			// This is a workaround to get roadmaps on the y-axis!
			// But since no roadmaps will ever be assigned tasks,
			// it should be O.K.A.Y.

			// I AM SO SORRY FOR THIS
			tasks = _.flatten(_.map(projects, function (project) {
				return _.each(project.tasks, function (task) {
					task.projectTitle = project.title;
					return task;
				});
			}));

			var zoom = d3.behavior.zoom()
				.scaleExtent([1, 1])
				.x(this.xScale)
				.on('zoom', function () {
					this.svgZoomable.attr('transform', 'translate(' + (d3.event.translate[0] + 10) + ', 0)scale(' + d3.event.scale + ')');
				}.bind(this));

//			svgTaskContainer = that.svg.append('g')
			svgTaskContainer = that.svgZoomable.append('g')
				.attr('class', 'task-container')
				.call(zoom);

			svgTasks = svgTaskContainer.selectAll('.task').data(tasks).enter().append('g')
				.attr('class', 'task')
				.attr('transform', function (taskDatum) {
					return 'translate(' + that.xScale(taskDatum.startTime) + ', ' + that.yScale(taskDatum.projectTitle) + ')';
				}.bind(this))
				.attr('width', function(taskDatum) {
					return (that.xScale(taskDatum.endTime) - that.xScale(taskDatum.startTime));
				}.bind(this));

			// @TODO: THING
			that.svgTasks = svgTasks;

			// Render task rectangles
			svgTasks.append('rect')
				.attr('class', function(taskDatum) {
					return taskDatum.title;
				})
				.attr('height', function() {
					return that.yScale.rangeBand();
				}.bind(this))
				.attr('width', function(taskDatum) {
					return (that.xScale(taskDatum.endTime) - that.xScale(taskDatum.startTime));
				}.bind(this));
		},
		/**
		 * Render the spotlight that highlights today in this graph
		 *
		 * VOID->VOID
		 */
		_drawSpotlight: function () {
			var today = new Date(),
				tomorrow = new Date(today.getTime() + 60 * 60 * 24 * 1000),
				svgTodayGroup;

//			svgTodayGroup = this.svg.append('g')
			svgTodayGroup = this.svgZoomable.append('g')
				.attr('transform', 'translate(' + this.xScale(new Date().getTime()) + ', 0)');

			svgTodayGroup.append('rect')
				.attr('class', 'spotlight')
				.attr('width', 1)
				.attr('height', this.options.height)
				.style('fill', 'black')
				.style('opacity', 0.4);

			svgTodayGroup.append('text')
				.text('Today')
				.attr('class', 'eta')
				.style('fill', '#555')
				.attr('dy', '1em')
				.attr('dx', '0.4em');
		}
	});

	return StackedGanttBehavior;
});
