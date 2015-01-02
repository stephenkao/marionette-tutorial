/*global define, window */

define([
	// Libraries
	'jquery',
	'backbone',
	'backbone.marionette',
	// Components
	'router/mainRouter',
	'app/marionetteApp',
	'collection/user.collection',
	'collection/project.collection',
	// Non-returning
	'lib/soyutils'
], function (
	// Libraries
	$,
	Backbone,
	Marionette,
	// Components
	MainRouter,
	MarionetteApp,
	UserCollection,
	ProjectCollection
) {
	'use strict';

	var router;

	// Set up the router
	router = new MainRouter();
	Backbone.history.start();

	MarionetteApp.start();

	// Fetch collections
	MarionetteApp.userCollection = new UserCollection();
	MarionetteApp.userCollection.fetch();
	MarionetteApp.projectCollection = new ProjectCollection();
	MarionetteApp.projectCollection.fetch();

	window.MarionetteApp = MarionetteApp;
});
