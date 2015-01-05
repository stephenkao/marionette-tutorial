/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/list/roadmapListItem.view',
	// Templates
	'templates/lesir/components/list/roadmap'
], function (
	// Libraries
	Marionette,
	// Components
	RoadmapListItemView
) {
	'use strict';

	var RoadmapListView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.list.roadmapList,
		tagName: 'section',
		className: 'column',
		itemViewContainer: '.roadmap-list',
		itemView: RoadmapListItemView,

		serializeData: function () {
			// Group all projects by 'roadmap' for ~visual organization~
			// This is a bit of a workaround for Backbone's inability to have nested Collections
			return this.collection.groupBy('roadmap');
		}
	});

	return RoadmapListView;
});
