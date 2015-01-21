/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'underscore',
	'backbone.marionette',
	'lib/xdate',
	// Templates
	'templates/lesir/components/list/project'
], function (
	// Libraries
	_,
	Marionette,
	XDate
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
			var project = this.model.attributes,
				startDate = new XDate(project.startTime),
				endDate = new XDate(project.endTime);

			return {
				_id: project._id.replace(/project/g, ''),
				title: project.title,
				startDate: startDate.toString('MM / dd / yy'),
				endDate: endDate.toString('MM / dd / yy'),
				duration: Math.floor(startDate.diffMonths(endDate)),
				usernames: _.pluck(this.model.get('users'), 'displayName').join(' ,'),
				progressString: (project.progress * 100) + '%',
				progressPercentage: project.progress
			};
		}
	});

	return ProjectListItemView;
});
