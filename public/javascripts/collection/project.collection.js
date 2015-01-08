/*global define*/

define([
	// Libraries
	'backbone',
	// Components
	'model/project.model'
], function (
	// Libraries
	Backbone,
	// Components
	ProjectModel
) {
	'use strict';

	var ProjectCollection = Backbone.Collection.extend({

		////////// Initialization
		url: '/projects',
		model: ProjectModel
	});

	return ProjectCollection;
});
