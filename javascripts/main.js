/*global define */

define([
	// Libraries
	'jquery',
	'backbone',
	// Components
	'app/MarionetteApp',

	// TEST
	'test/test'
], function (
	// Libraries
	$,
	Backbone,
	// Components
	MarionetteApp,

	testThing
) {
	'use strict';

	MarionetteApp.start();

	// TEST
	MarionetteApp.userCollection = new Backbone.Collection([testThing.users]);
	MarionetteApp.projectCollection = new Backbone.Collection([testThing.projects]);
});
