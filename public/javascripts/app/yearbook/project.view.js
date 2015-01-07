/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/yearbook/user'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var UserListItemView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userListItem,
		tagName: 'li',
		className: 'user--yearbook centered',
		itemViewContainer: '.projectlist'
		itemView:
	});

	return UserListItemView;
});
