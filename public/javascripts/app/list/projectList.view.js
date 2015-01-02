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

	var ProjectListView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.listApp.projectList,
		tagName: 'section',
		className: 'column roadmap roadmap--listitem',
		itemViewContainer: '.project-list',
		itemView: ProjectListItemView,

		////////// Events
		collectionEvents: {
			reset: 'serializeData'
		},

		serializeData: function () {
			console.log(this.collection);
		}
	});

	return ProjectListView;
});
