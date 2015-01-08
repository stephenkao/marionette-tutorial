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
	'collection/roadmap.collection',
	'app/list/roadmapList.view',
	// Templates
	'templates/lesir/components/list/app'
], function (
	// Libraries
	Marionette,
	// Components
	MarionetteApp,
	RoadmapCollection,
	RoadmapListView
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
			this.roadmapCollection = new RoadmapCollection();
			this.roadmapListView = new RoadmapListView({
				collection: this.roadmapCollection
			});
		},
		onRender: function () {
			this.contentRegion.show(this.roadmapListView);
			this.roadmapCollection.fetch({reset: true});
		}
	});

	return ListPageLayout;
});
