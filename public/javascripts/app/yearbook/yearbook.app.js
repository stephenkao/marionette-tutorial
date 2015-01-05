/*global define, lesir */

/**
 * A page application that manages the 'yearbook' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'collection/user.collection',
	'app/yearbook/userList.view'
], function (
	// Libraries
	Marionette,
	// Components
	UserCollection,
	UserListView
) {
	'use strict';

	var YearbookPageLayout;

	YearbookPageLayout = Marionette.Layout.extend({

		////////// App components
		userCollection: null,
		userListView: null,

		////////// Initialization
		className: 'app app-yearbook',
		template: lesir.components.yearbook.app,
		regions: {
			contentRegion: '.content-region'
		},
		/**
		 * Initialize the app-specific components
		 *
		 * VOID->VOID
		 */
		initialize: function () {
			this.userCollection = new UserCollection();
			this.userListView = new UserListView({
				collection: this.userCollection
			});
		},
		onRender: function () {
			this.userCollection.fetch({reset: true});
		}
	});

	return YearbookPageLayout;
});
