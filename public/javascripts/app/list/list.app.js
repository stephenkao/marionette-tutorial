/*global define, lesir */

/**
 * A page application that manages the 'list' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/marionetteApp',
	'app/list/roadmapList.view',
	'collection/project.collection',
	// Templates
	'templates/lesir/components/list/app'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	RoadmapListView,
	ProjectCollection
) {
	'use strict';

	var ListPageLayout;

	ListPageLayout = Marionette.Layout.extend({

		////////// App components
		projectCollection: null,
		roadmapListView: null,

		////////// Initialization
		className: 'app app--list',
		template: lesir.components.list.app,
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
			this.roadmapListView = new RoadmapListView({
				collection: this.projectCollection
			});
		},
		onRender: function () {
			this.contentRegion.show(this.roadmapListView);
			this.projectCollection.fetch({reset: true});
		}
	});

	return ListPageLayout;
});
