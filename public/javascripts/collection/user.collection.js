/*global define*/

define([
	// Libraries
	'backbone',
	// Components
	'model/user.model'
], function (
	// Libraries
	Backbone,
	// Components
	UserModel
) {
	'use strict';

	var UserCollection = Backbone.Collection.extend({
		////////// Initialization
		url: '/users',
		model: UserModel
	});

	return UserCollection;
});
