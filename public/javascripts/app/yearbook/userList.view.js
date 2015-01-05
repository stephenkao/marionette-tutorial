/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/yearbook/userListItem.view',
	// Templates
	'templates/lesir/components/yearbook/user'
], function (
	// Libraries
	Marionette,
	// Components
	UserListItemView
) {
	'use strict';

	var UserListView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userList,
		tagName: 'section',
		className: 'column',
		itemViewContainer: '.user-list',
		itemView: UserListItemView
	});

	return UserListView;
});
