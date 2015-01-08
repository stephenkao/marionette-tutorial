/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/yearbook/userProject.view',
	// Templates
	'templates/lesir/components/yearbook/user',
	'templates/lesir/components/yearbook/project'
], function (
	// Libraries
	Marionette,
	// Components
	UserProjectView
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
