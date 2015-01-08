/*global define */

/**
 * A Model that represents a roadmap
 * NOTE: This is currently not much more than a minor workaround
 * to circumvent Backbone's lack of support for nested Collections.
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone',
	// Components
	'collection/project.collection'
], function (
	// Libraries
	Backbone,
	// Components
	ProjectCollection
) {
	'use strict';

	var RoadmapModel = Backbone.Model.extend({

		////////// Fields
		defaults: {
			title: '',
			projects: null
		},

		////////// Initialization
		/**
		 * Initialize this Model and instantiate the nested Collections/Models
		 *
		 * VOID->VOID
		 */
		initialize: function () {
			var projects = this.get('projects');

			// Nested ProjectCollection
			if (projects && projects.length) {
				this.set('projects', new ProjectCollection(projects));
			}
		}
	});

	return RoadmapModel;
});
