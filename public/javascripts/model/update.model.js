/*global define */

/**
 * A Model that represents a single update to a project
 * Like "Buttface McGee updated the documentation one day ago"
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

	var UpdateModel = Backbone.Model.extend({

		////////// Field
		defaults: {
			message: '',
			timestamp: new Date().getTime()
		},

		////////// Update
		/**
		 * Update the message of this task
		 *
		 * @param {!string} msgText
		 */
		updateMessage: function (msgText) {
			this.set('message', msgText);
		}
	});

	return UpdateModel;
});
