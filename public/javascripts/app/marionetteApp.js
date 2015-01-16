/*global define, window */

/**
 * A top-level Marionette.Application
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Singletons
	'singleton/const',
	// Non-returning
	'lib/soyutils'
], function (
	// Libraries
	Marionette,
	// Singletons
	constants
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

	// Override the inherent render function for all Marionette.View extensions
	// in order to get some global injected data stufffffffff in it
	Marionette.Renderer.render = function (template, data) {
		return window.soy.renderAsFragment(template, data, undefined, constants);
	};

	return MarionetteApp;
});
