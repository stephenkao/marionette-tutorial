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
		var tasks = [];n
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
				.ticks(d3.time.months, 1)
				.tickFormat(d3.time.format('%M \'%y'))
				.tickSubdivide(true)
				.tickSize(8)
				.tickPadding(8);

			yAxis = d3.svg.axis()
				.scale(y)
				.orient('left')
				.tickSize(0);
		};

		var x, y, xAxis, yAxis;
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

			var svgTasks = svg.selectAll('.chart').data(tasks, keyFunction).enter().append('g')
				.classed('gantt-task', true)
				.attr('transform', function (d) {
					return rectTransform(d);
				})
				.attr('width', function(d) {
					return (x(d.endDate) - x(d.startDate));
				});

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

			svgTasks.append('text')
				.attr('x', '1em')
				.attr('y', '1.4em')
				.classed('zeta', true)
				.style('text-transform', 'uppercase')
				.style('fill', 'white')
				.text(function(d) {
					return d.title;
				});

			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, 0)')
				.transition()
				.call(xAxis);

			return gantt;

		};

		gantt.redraw = function(tasks) {
			debugger;

			initTimeDomain();
			initAxis();

			var svg = d3.select("svg");

			var ganttChartGroup = svg.select(".gantt-chart");
			var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);

			rect.enter()
				.insert("rect",":first-child")
				.attr("rx", 5)
				.attr("ry", 5)
				.attr("class", function(d){
					if (taskStatus[d.status] == null) {
						return "bar";
					}

					return taskStatus[d.status];
				})
				.transition()
				.attr("y", 0)
				.attr("transform", rectTransform)
				.attr("height", function(d) { return y.rangeBand(); })
				.attr("width", function(d) {
					return (x(d.endDate) - x(d.startDate));
				});

			rect.transition()
				.attr("transform", rectTransform)
				.attr("height", function(d) { return y.rangeBand(); })
				.attr("width", function(d) {
					return (x(d.endDate) - x(d.startDate));
				});

			rect.exit().remove();

			svg.select(".x").transition().call(xAxis);
//			svg.select(".y").transition().call(yAxis);

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
