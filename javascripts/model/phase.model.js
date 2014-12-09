/*global define */

/**
 * A Model that represents a specific phase of a project
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

	var PhaseModel = Backbone.Model({

		////////// Fields
		defaults: {
			type: 0,
			project: null,
			startTime: new Date().getTime(),
			endTime: new Date().getTime()
		}
	}, {
		/**
		 * A dictionary of phase types
		 *
		 * @type {!Object.<!string, number>}
		 */
		types: {
			PLANNING: 1,
			RESEARCH: 2,
			DESIGN: 3,
			IMPLEMENTATION: 4,
			FOLLOWUP: 5
		}
	});

	return PhaseModel;
});
