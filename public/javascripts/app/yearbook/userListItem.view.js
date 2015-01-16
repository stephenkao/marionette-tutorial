/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/yearbook/user',
	'templates/lesir/components/yearbook/project'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var UserListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userListItem,
		tagName: 'li',
		className: 'user--yearbook'
	});

	return UserListItemView;
});
