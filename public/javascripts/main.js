/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	'backbone.marionette',
	// Components
	'router/mainRouter',
	'app/marionetteApp',
	'model/project.model',
	'app/list/projectList.view',
	// Non-returning
	'lib/soyutils',
	// TEST
	'test/test'
], function (
	// Libraries
	$,
	Backbone,
	Marionette,
	// Components
	MainRouter,
	MarionetteApp,
	ProjectModel,
	ProjectListView,
	// Non-returning
	soy,
	// TEST
	testThing
) {
	'use strict';

	// Set up the router
	var router = new MainRouter();
	Backbone.history.start();

	// TEST
	MarionetteApp.userCollection = new Backbone.Collection(testThing.users);
	MarionetteApp.projectCollection = new Backbone.Collection(testThing.projects, {
		model: ProjectModel
	});

	MarionetteApp.start();

	window.MarionetteApp = MarionetteApp;
});
