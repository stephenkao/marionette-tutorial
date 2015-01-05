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
	'backbone'
], function (
	// Libraries
	Backbone
) {
	'use strict';

	var RoadmapModel = Backbone.Model.extend({

		////////// Fields
		defaults: {
			title: '',
			projectCollection: null
		},

		////////// Initialization
		/**
		 * Initialize this Model and instantiate the nested Collections/Models
		 *
		 * VOID->VOID
		 */
		initialize: function () {
		}
	});

	return RoadmapModel;
});
