/*global define */

/**
 * A Model that represents a user
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

	var UserModel = Backbone.Model.extend({

		////////// Fields
		defaults: {
			displayName: 'D. Fault'
		},

		////////// Authentication
		authenticate: function () {}
	}, {
		// Static/class variables
		/**
		 * @type {!Object.<!string, number>}
		 *
		 * A dictionary of user types
		 */
		types: {
			SUPERUSER: 1,
			AUTHOR: 2,
			READER: 3
		}
	});

	return UserModel;
});
