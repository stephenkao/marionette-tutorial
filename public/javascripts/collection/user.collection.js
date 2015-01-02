/*global define*/

define([
	// Libraries
	'backbone'
], function (
	// Libraries
	Backbone
) {
	'use strict';

	var UserCollection = Backbone.Collection.extend({
		////////// Initialization
		url: '/users'
	});

	return UserCollection;
});
