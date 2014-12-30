/*global define */

/**
 * A page application that manages the 'project' view
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

	var ProjectApp, projectApp;

	ProjectApp = Marionette.Controller.extend({
		initialize: function () {
		}
	});

	projectApp = new ProjectApp();

	return projectApp;
});
