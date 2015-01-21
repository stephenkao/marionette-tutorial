/*global require, global, module */

(function () {
	var _ = require('underscore'),
		eden = require('node-eden'),
		consts = require('./_consts.js'),
		Project;

	Project = {
		/**
		 * Given an index, create a project
		 *
		 * @param {number} index
		 * @return {!Object}
		 */
		createProject: function (index) {
			var projectId = 'project' + i,
				title = [eden.word(), eden.word()].join(' '),
				userIds = _.uniq(global.projectUserLookup[projectId]),
				tasks = [],
				users = [],
				updates = [],
				numUpdates = _.random(2, 5),
				startTime, endTime, taskStartTime, taskEndTime,
				i;

			// Set a random startTime (4~6 weeks before TODAY);
			startTime = consts.TODAY - (consts.DAY_SPAN * _.random(24, 42));

			// Populate this project's tasks
			tasks = consts.TASK_TYPES.map(function (taskTitle, index) {
				// Generate a random task length (2~5 weeks)
				var taskLength = consts.DAY_SPAN * _.random(14, 35);
				taskStartTime = startTime + (index * consts.WEEK_SPAN);
				taskEndTime = taskStartTime + taskLength;

				return {
					title: taskTitle,
					startTime: taskStartTime,
					endTime: taskEndTime
				};
			});

			// Populate this project's users
			users = userIds.map(function (uId) {
				return {
					role: _.sample(consts.PROJECT_ROLES),
					user_id: uId
				};
			});
			// The end time of the last task will be the end time of the project
			endTime = taskEndTime;

			// Populate this project's updates
			for (i = 0; i < numUpdates; ++i) {
				updates.push({
					type: _.sample(consts.UPDATE_TYPES),
					created: _.random(endTime, startTime),
					user_id: _.sample(userIds)
				});
			}

			return {
				_id: projectId,
				title: title,
				progress: (_.random(0.1, 0.9)).toFixed(1),
				startTime: startTime,
				endTime: endTime,
				priority: _.random(10, 90),
				tasks: tasks,
				updates: updates,
				roadmap: _.sample(consts.PROJECT_ROADMAPS),
				users: users
			};
		}
	};

	module.exports = Project;
})();
