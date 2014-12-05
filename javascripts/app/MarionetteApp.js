/*global define */

/**
 * A top-level Marionette.Application
 *
 * @author Stephen Kao
 */
define([
	'backbone.marionette'
], function (
	Marionette
) {
	'use strict';

	var MarionetteApp = new Marionette.Application();

	// NOTE: We generally add Regions to the top-level MarionetteApp
	// to serve as placeholders for somewhat permanent fixtures, such as
	//  1. Sidebar
	//  2. Top navigational bar
	//  3. Footer
	//  4. Editor instance
	//  5. Comment applet
	// Regions that aren't 'global' like these should be instantiated in smaller/localized scopes.
	// (Additionally, anything pre-rendered does not need to be bound to a top-level Region.)
	MarionetteApp.addRegions({});

	return MarionetteApp;
});
