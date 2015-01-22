/*global define */

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

	var RoadmapListView = Marionette.CollectionView.extend({

		////////// Initialization
		tagName: 'ul',
		className: 'row',
		itemView: RoadmapListItemView
	});

	return RoadmapListView;
});
