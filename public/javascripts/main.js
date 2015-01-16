/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	'backbone.marionette',
	// Components
	'router/mainRouter',
	'app/marionetteApp'
], function (
	// Libraries
	$,
	Backbone,
	Marionette,
	// Components
	MainRouter,
	MarionetteApp
) {
	'use strict';

	var router;

	// Set up the router
	router = new MainRouter();
	Backbone.history.start();

	MarionetteApp.start();

	window.MarionetteApp = MarionetteApp;
});
