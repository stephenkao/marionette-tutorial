/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	'backbone.marionette',
	// Components
	'router/mainRouter',
	'app/marionetteApp',
	// Non-returning
	'lib/soyutils'
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

	// Set up the router
	var router = new MainRouter();
	Backbone.history.start();

	// TEST
//	MarionetteApp.userCollection = new Backbone.Collection(testThing.users);
//	MarionetteApp.projectCollection = new Backbone.Collection(testThing.projects, {
//		model: ProjectModel
//	});

	MarionetteApp.start();

	window.MarionetteApp = MarionetteApp;
});
