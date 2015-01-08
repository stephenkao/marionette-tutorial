/*global define*/

define([
	// Libraries
	'backbone',
	// Components
	'model/roadmap.model'
], function (
	// Libraries
	Backbone,
	// Components
	RoadmapModel
) {
	'use strict';

	var RoadmapCollection = Backbone.Collection.extend({

		////////// Initialization
		url: '/roadmaps',
		model: RoadmapModel
	});

	return RoadmapCollection;
});
