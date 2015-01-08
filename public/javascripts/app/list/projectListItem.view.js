/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Singletons
	'singleton/stringUtils',
	// Templates
	'templates/lesir/components/list/project'
], function (
	// Libraries
	Marionette,
	// Singletons
	stringUtils
) {
	'use strict';

	var ProjectListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.list.projectListItem,
		tagName: 'li',
		className: 'row project--listitem',
		modelEvents: {
			change: 'render'
		},
		serializeData: function () {
			window['view' + this.cid] = this;
			window['model' + this.model.cid] = this.model;
			var project = this.model.attributes;

			return {
				title: project.title,
				startDate: stringUtils.formatDate(project.startTime),
				endDate: stringUtils.formatDate(project.endTime),
				duration: stringUtils.getTimeDifference(project.startTime, project.endTime),
				usernames: ['smelly', 'dumbo'],
				progressString: (project.progress * 100) + '%',
				progressPercentage: project.progress
			};
		}
	});

	return ProjectListItemView;
});
