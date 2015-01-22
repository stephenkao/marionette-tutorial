/*global define */
define(['lib/d3'], function (d3) {
	'use strict';

	/**
	 * @author Dimitry Kudrayvtsev
	 * @version 2.0
	 */

	d3.gantt = function(selector) {
		var FIT_TIME_DOMAIN_MODE = "fit";
		var FIXED_TIME_DOMAIN_MODE = "fixed";

		var margin = {
			top: 30,
			right: 0,
			bottom: 30,
			left: 0
		};
		var selection = d3.select(selector);
		var timeDomainStart = d3.time.day.offset(new Date(),-3);
		var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
		var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
		var tasks = [];
		var taskTypes = [];
		var taskStatus = [];
		var height = parseInt(selection.style('height'), 10) - margin.top - margin.bottom;
		var width = parseInt(selection.style('width'), 10) - 2 * parseInt(selection.style('padding-left'), 10);

		var keyFunction = function(d) {
			return d.startDate + d.taskName + d.endDate;
		};

		var rectTransform = function(d) {
			return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
		};

		var initAxis = function() {
			x = d3.time.scale()
				.domain([ timeDomainStart, timeDomainEnd ])
				.range([ 0, width ]).clamp(true);

			y = d3.scale.ordinal()
				.domain(taskTypes)
				.rangeRoundBands([ 0, height - margin.top - margin.bottom ], 0.4);

			xAxis = d3.svg.axis()
				.scale(x)
				.orient('top')
				.ticks(d3.time.months)
				.tickFormat(function (datum) {
					var months = [
						'Jan',
						'Feb',
						'Mar',
						'Apr',
						'May',
						'June',
						'July',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec'
					];

					return [
						months[datum.getMonth()],
						(datum.getFullYear() + '').slice(2)
					].join(' \'');
				});
		};

		var x, y, xAxis;
		initAxis();

		var initTimeDomain = function() {
			if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
				if (tasks === undefined || tasks.length < 1) {
					timeDomainStart = d3.time.day.offset(new Date(), -3);
					timeDomainEnd = d3.time.hour.offset(new Date(), +3);
					return;
				}

				tasks.sort(function(a, b) {
					return a.endDate - b.endDate;
				});

				timeDomainEnd = tasks[tasks.length - 1].endDate;

				tasks.sort(function(a, b) {
					return a.startDate - b.startDate;
				});

				timeDomainStart = tasks[0].startDate;
			}
		};

		function gantt(newTasks) {

			tasks = newTasks;

			initTimeDomain();
			initAxis();

			var selection = d3.select(selector),
				width = parseInt(selection.style('width'), 10),
			    	height = parseInt(selection.style('height'), 10),
				svg;

			svg = selection.append('svg')
				.attr('class', 'chart')
				.attr('viewBox', [0, 0, width, height].join(' '))
				.attr('preserveAspectRatio', 'xMidYMid')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
			    .append('g')
				.attr('class', 'gantt-chart')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

			// Add grid lines
			svg.append('g')
				.attr('class', 'grid')
				.call(function () {
					return d3.svg.axis()
						.scale(x)
						.orient('top')
						.ticks(d3.time.days);
					}()
					.tickSize(-height, 0, 0)
					.tickFormat('')
				);
			svg.selectAll('.grid line')
				.attr('stroke-dasharray', '2, 8')
				.attr('y1', 0)
				.attr('y2', 300 - margin.bottom); // WHAT?

			var svgTasks = svg.selectAll('.chart').data(tasks, keyFunction).enter().append('g')
				.classed('gantt-task', true)
				.attr('transform', function (d) {
					return rectTransform(d);
				})
				.attr('width', function(d) {
					return (x(d.endDate) - x(d.startDate));
				});

			// Add task rectangles
			svgTasks.append('rect')
				.attr('class', function(datum) {
					return datum.title;
				})
				.attr('height', function(d) {
					return y.rangeBand();
				})
				.attr('width', function(d) {
					return (x(d.endDate) - x(d.startDate));
				});
			// Add task labels
			svgTasks.append('text')
				.attr('x', '1em')
				.attr('y', '1.4em')
				.classed('zeta', true)
				.style('text-transform', 'uppercase')
				.style('fill', 'white')
				.text(function(d) {
					return d.title;
				});

			// Add axis
			svg.append('g')
				.attr('class', 'axis--x')
				.attr('transform', 'translate(0, 0)')
				.transition()
				.call(xAxis);

			// Add 'today' spotlight
			var today = new Date(),
				tomorrow = new Date(today.getTime() + 60 * 60 * 24 * 1000),
				dayWidth = x(tomorrow) - x(today);
			svg.append('rect')
				.attr('class', 'spotlight')
				.attr('transform', 'translate(' + x(new Date().getTime()) + ', 0)')
				.attr('width', dayWidth)
				.attr('height', height - margin.top - margin.bottom)
				.style('fill', 'yellow')
				.style('opacity', 0.4);

			return gantt;

		};

		gantt.margin = function(value) {
			if (!arguments.length)
				return margin;
			margin = value;
			return gantt;
		};

		gantt.timeDomain = function(value) {
			if (!arguments.length)
				return [ timeDomainStart, timeDomainEnd ];
			timeDomainStart = +value[0], timeDomainEnd = +value[1];
			return gantt;
		};

		/**
		 * @param {string}
		 *                vale The value can be "fit" - the domain fits the data or
		 *                "fixed" - fixed domain.
		 */
		gantt.timeDomainMode = function(value) {
			if (!arguments.length)
				return timeDomainMode;
			timeDomainMode = value;
			return gantt;

		};

		gantt.taskTypes = function(value) {
			if (!arguments.length)
				return taskTypes;
			taskTypes = value;
			return gantt;
		};

		gantt.taskStatus = function(value) {
			if (!arguments.length)
				return taskStatus;
			taskStatus = value;
			return gantt;
		};

		gantt.width = function(value) {
			if (!arguments.length)
				return width;
			width = +value;
			return gantt;
		};

		gantt.height = function(value) {
			if (!arguments.length)
				return height;
			height = +value;
			return gantt;
		};

		gantt.tickFormat = function(value) {
			if (!arguments.length)
				return tickFormat;
			tickFormat = value;
			return gantt;
		};

		return gantt;
	};
});
