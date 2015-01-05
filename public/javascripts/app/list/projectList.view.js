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
	'templates/lesir/components/list/project'
], function (
	// Libraries
	Marionette,
	// Components
	ProjectListItemView
) {
	'use strict';

	var ProjectListView = Marionette.CompositeView.extend({

		////////// Initialization
		template: lesir.components.list.projectList,
		tagName: 'section',
		className: 'column roadmap roadmap--listitem',
		itemViewContainer: '.project-list',
		itemView: ProjectListItemView,

		serializeData: function () {
			// Group all projects by 'roadmap' for ~visual organization~
			return this.collection.groupBy('roadmap');
		}
	});

	return ProjectListView;
});
