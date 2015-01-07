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
	'collection/project.collection',
	'collection/user.collection',
	'app/yearbook/userList.view',
	// Templates
	'templates/lesir/components/yearbook/app'
], function (
	// Libraries
	Marionette,
	// Components
	ProjectCollection,
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
			this.projectCollection = new ProjectCollection();
			this.userCollection = new UserCollection();
			this.userListView = new UserListView({
				collection: this.userCollection
			});
		},
		onRender: function () {
			var that = this;

			that.projectCollection.fetch({reset: true}).done(function () {
				that.userCollection.fetch({reset: true});
				that.contentRegion.show(that.userListView);
			});
		}
	});

	return YearbookPageLayout;
});
