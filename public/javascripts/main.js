/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	// Components
	'app/MarionetteApp',
	'model/project.model',
	'app/list/projectList.view',
	// TEST
	'test/test'
], function (
	// Libraries
	$,
	Backbone,
	// Components
	MarionetteApp,
	ProjectModel,
	ProjectListView,
	// TEST
	testThing
) {
	'use strict';

	MarionetteApp.start();

	// TEST
	MarionetteApp.userCollection = new Backbone.Collection(testThing.users);
	MarionetteApp.projectCollection = new Backbone.Collection(testThing.projects, {
		model: ProjectModel
	});

	window.MarionetteApp = MarionetteApp;
});
