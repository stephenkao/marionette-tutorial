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
	'templates/lesir/components/yearbook/user'
], function (
	// Libraries
	Marionette,
	// Components
	UserProjectView
) {
	'use strict';

	var UserListItemView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userListItem,
		tagName: 'li',
		className: 'user--yearbook centered',
		itemViewContainer: '.projectlist',
		itemView: UserProjectView
	});

	return UserListItemView;
});
