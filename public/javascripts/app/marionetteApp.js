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

	// NOTE: The following logic has been deprecated,
	// but I'm keeping it here to mirror what's in our code base right now.
	// (https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#application-regions)
	// Eventually, we'll want to move this out into its own Layout.
	MarionetteApp.addRegions({
		contentRegion: '#js_content'
	});

	return MarionetteApp;
});
