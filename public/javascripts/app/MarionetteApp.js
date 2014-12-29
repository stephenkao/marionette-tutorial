/*global define */

/**
 * A top-level Marionette.Application
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

	var MarionetteApp = new Marionette.Application();

	return MarionetteApp;
});
