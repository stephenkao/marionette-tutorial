/*global require, global, module, process */

(function () {
	'use strict';

	var _ = require('underscore'),
		eden = require('node-eden'),
		consts = require('./_consts.js'),
		jf = require('jsonfile'),
		Project;

	Project = {
		/**
		 * Given an index, create a random project
		 *
		 * @param {number} index
		 * @return {!Object}
		 */
		createProject: function (index) {
			var projectId = 'project' + index,
				title = [eden.word(), eden.word()].join(' '),
				userIds = _.uniq(global.projectUserLookup[projectId]),
				tasks = [],
				users = [],
				updates = [],
				memo = '',
				startTime, endTime, taskStartTime, taskEndTime,
				i;

			// Set a random startTime (1~6 weeks before TODAY);
			startTime = consts.TODAY - (consts.DAY_SPAN * _.random(7, 42));

			// Populate this project's tasks
			tasks = consts.TASK_TYPES.map(function (taskTitle, index) {
				// Generate a random task length (2~4 weeks)
				var taskLength = consts.DAY_SPAN * _.random(14, 28);
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
			for (i = 0; i < _.random(2, 5); ++i) {
				updates.push({
					type: _.sample(consts.UPDATE_TYPES),
					created: _.random(endTime, startTime),
					user_id: _.sample(userIds)
				});
			}

			// Generate the nonsensical memo
			for (i = 0; i < _.random(25, 50); ++i) {
				var wordGen = [eden.adam, eden.eve, eden.word];
				memo += _.sample(wordGen)() + ' ';
			}

			return {
				_id: projectId,
				title: title,
				progress: Math.random().toFixed(2),
				startTime: startTime,
				endTime: endTime,
				priority: _.random(10, 90),
				tasks: tasks,
				updates: updates,
				roadmap_id: 'roadmap' + _.random(0, consts.NUM_ROADMAPS - 1),
				users: users,
				memo: memo
			};
		},

		////////// AJAX routes
		/**
		 * Retrieve all projects (shallow population)
		 *
		 * @return {!Array.<!Object>}
		 */
		getProjects: function () {
			var projects = jf.readFileSync(consts.FILES.PROJECTS);
			projects = _.map(projects, function (project) {
				return Project.getProject(project._id);
			});
			return projects;
		},
		/**
		 * Retrieve a project by id (shallow population)
		 *
		 * @param {number} projectId
		 * @return {!Object}
		 */
		getProject: function (projectId) {
			var projects = _.indexBy(jf.readFileSync(consts.FILES.PROJECTS), '_id'),
				users = _.indexBy(jf.readFileSync(consts.FILES.USERS), '_id'),
				roadmaps = _.indexBy(jf.readFileSync(consts.FILES.ROADMAPS), '_id'),
				thisProject = projects[projectId];

			// Populate users list
			thisProject.users = _.map(thisProject.users, function (userReference) {
				var userId = userReference.user_id;
				delete userReference.user_id;
				return _.clone(users[userId]);
			});

			// Populate user references in updates list
			thisProject.updates = _.each(thisProject.updates, function (updateReference) {
				updateReference.user = _.clone(users[updateReference.user_id]);
			});

			// Populate roadmaps
			thisProject.roadmap = roadmaps[thisProject.roadmap_id];

			return thisProject;
		}
	};

	module.exports = Project;
})();
