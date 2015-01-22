/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'underscore',
	'backbone.marionette',
	// Templates
	'templates/lesir/components/yearbook/user',
	'templates/lesir/components/yearbook/project'
], function (
	// Libraries
	_,
	Marionette
) {
	'use strict';

	var UserListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userListItem,
		tagName: 'li',
		className: 'user--yearbook',

		serializeData: function () {
			var user = this.model.attributes,
				today = new Date().getTime() / 1000;

			return {
				displayName: user.displayName,
				imageUrl: user.imageUrl,
				projects: _.each(user.projects, function (project) {
					var tasksLen = project.tasks.length,
						currentTask;

					// Determine the current task of the project
					currentTask = _.find(project.tasks, function (task) {
						return (today < task.endTime && today > task.startTime);
					});

					// ...or default to the last task
					if (!currentTask) {
						currentTask = project.tasks[tasksLen - 1];
					}

					project.currentTask = currentTask.title;

					return project;
				})
			};
		}
	});

	return UserListItemView;
});
