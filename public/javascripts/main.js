/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	// Components
	'app/MarionetteApp',
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
	soy,
	// Components
	MarionetteApp,
	ProjectModel,
	ProjectListView,
	// TEST
	testThing
) {
	'use strict';

	// TEST
	MarionetteApp.userCollection = new Backbone.Collection(testThing.users);
	MarionetteApp.projectCollection = new Backbone.Collection(testThing.projects, {
		model: ProjectModel
	});

	window.MarionetteApp = MarionetteApp;
});
