/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/list/projectListItem.view',
	// Templates
	'templates/lesir/components/list/roadmap'
], function (
	// Libraries
	Marionette,
	// Components
	ProjectListItemView
) {
	'use strict';

	var RoadmapListItemView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.list.roadmapList,
		tagName: 'section',
		className: 'column',
		itemViewContainer: '.roadmap__projectlist',
		itemView: ProjectListItemView,
		initialize: function () {
			this.collection = this.model.get('projects');
		}
	});

	return RoadmapListItemView;
});
