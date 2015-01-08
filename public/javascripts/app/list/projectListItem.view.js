/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/list/project'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var ProjectListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.list.projectListItem,
		tagName: 'li',
		className: 'row project--listitem',
		serializeData: function () {
			var project = this.model.attributes;

			return {
				title: project.title,
				startDate: project.startTime,
				endDate: project.endTime,
				duration: project.endTime - project.startTime,
				usernames: ['smelly', 'dumbo'],
				progressString: (project.progress * 100) + '%',
				progressPercentage: project.progress
			};
		}
	});

	return ProjectListItemView;
});
