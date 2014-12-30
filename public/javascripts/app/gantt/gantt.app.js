/*global define */

/**
 * A page application that manages the 'gantt' view
 *
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

	var GanttApp, ganttApp;

	GanttApp = Marionette.Controller.extend({
		initialize: function () {
		}
	});

	ganttApp = new GanttApp();

	return ganttApp;
});
