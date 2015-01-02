/*global define*/

define([
	// Libraries
	'backbone'
], function (
	// Libraries
	Backbone
) {
	'use strict';

	var ProjectCollection = Backbone.Collection.extend({
		////////// Initialization
		url: '/projects'
	});

	return ProjectCollection;
});
