/*global require */

(function () {
	var _ = require('underscore'),
		fs = require('fs'),
		eden = require('node-eden'),
		jf = require('jsonfile'),
		usersJson = [],
		projectsJson = [],
		userProjectLookup = {}, // user:project map
		projectUserLookup = {}, // project:user map
		rolesJson = {},
		// Not really necessary, but it's nice to cap these off
		NUM_USERS = 20,
		NUM_PROJECTS = 10,
		PROJECT_ROLES = ['ui', 'ux', 'dev', 'pm'],
		PROJECT_ROADMAPS = ['reading', 'editor', 'standalone', 'refresh', 'coral', 'stability'],
		UPDATE_TYPES = ['project created', 'project updated', 'document uploaded', 'document edited'],
		TODAY = Math.floor(new Date().getTime() / 1000),
		daySpan = 60 * 60 * 24,
		weekSpan = daySpan * 7,
		monthSpan = weekSpan * 4,
		filename, _getRandom, i, j;

	jf.spaces = 8;

	/**
	 * @param {(!Array|number)} list
	 * @param {number=} limit
	 */
	_getRandom = function (list, limit) {
		var len;

		if (typeof list === 'number' && typeof limit === 'number') {
			return Math.floor(Math.random() * limit) + list;
		}

		len = list.length;
		return list[Math.floor(Math.random() * len)];
	};

	// Generate the users
	for (i = 0; i < NUM_USERS; ++i) {
		var uId = 'user' + i,
			firstName = (i % 2 === 0) ? eden.adam() : eden.eve(),
			lastName = (i % 2 === 0) ? eden.eve() : eden.adam(),
			projects = [],
			numProjects = _getRandom(2, 5);

		// Generate this user's project ids
		for (j = 0; j < numProjects; ++j) {
			var pId = 'project' + _getRandom(0, NUM_PROJECTS);
			if (!projectUserLookup.hasOwnProperty(pId)) {
				projectUserLookup[pId] = [];
			}
			projectUserLookup[pId].push(uId);
			projects.push(pId);
		}
		// Save the project ids in the lookup for ~relational stuff~
		userProjectLookup[uId] = projects;

		usersJson.push({
			_id: uId,
			privilege: Math.floor(Math.random() * 4) + 1,
			displayName: [firstName, eden.word()].join(' '),
			projects: projects
		});
	}
	filename = 'data/users2.json';
	jf.writeFileSync(filename, usersJson);
	console.log(filename + ': SUCCESS');

	// Generate the projects
	for (i = 0; i < NUM_PROJECTS; ++i) {
		var projectId = 'project' + i,
			title = [eden.word(), eden.word()].join(' '),
			tasks = [
				'planning',
				'research',
				'design',
				'implementation',
				'followup'
			],
			userIds = _.uniq(projectUserLookup[projectId]),
			users = [],
			updates = [],
			numUpdates = _getRandom(2, 5),
			startTime, endTime,
			taskStartTime, taskEndTime;

		// Set a random startTime (4~6 weeks before TODAY);
		startTime = TODAY - (daySpan * _getRandom(24, 42));

		// Populate this project's tasks
		tasks = tasks.map(function (taskTitle, index) {
			// Generate a random task length (1~3 weeks)
			var taskLength = daySpan * _getRandom(7, 21);
			taskStartTime = startTime + (index * 2 * weekSpan);
			taskEndTime = startTime + taskLength;

			return {
				title: taskTitle,
				startTime: taskStartTime,
				endTime: taskEndTime
			};
		});

		// Populate this project's users
		users = userIds.map(function (uId) {
			return {
				role: _getRandom(PROJECT_ROLES),
				user_id: uId
			};
		});
		// The end time of the last task will be the end time of the project
		endTime = taskEndTime;

		// Populate this project's updates
		for (j = 0; j < numUpdates; ++j) {
			updates.push({
				type: _getRandom(UPDATE_TYPES),
				created: _getRandom(endTime, startTime),
				user_id: _getRandom(userIds)
			});
		}

		projectsJson.push({
			_id: projectId,
			title: title,
			progress: Math.random() * 0.9 + 0.1,
			startTime: startTime,
			endTime: endTime,
			priority: _getRandom(10, 90),
			tasks: tasks,
			updates: updates,
			roadmap: _getRandom(PROJECT_ROADMAPS),
			users: users
		});
	}
	filename = 'data/projects.json';
	jf.writeFileSync(filename, projectsJson);
	console.log(filename + ': SUCCESS');

/*
	var task = {
		"_id": "task1",
		"type": 1,
		"project_id": "project1",
		"startTime": 1421193600,
		"endTime": 1422403200
	};
	var update = {
		"_id": "update1",
		"type": 1,
		"time": 1421193600,
		"user_id": "user1"
	};
	var user = {
		"_id": "user1",
		"type": 1,
		"displayName": "Blah blah",
		"email": "blah@blah.com",
		"projects": ["project1", "project2"]
	};
	var role = {
		"user_id": "user1",
		"project_id": "project1",
		"type": 1
	};
	var project = {
		"_id": "project1",
		"title": "What",
		"progress": 0.7,
		"startTime": 1421193600,
		"endTime": 1422403200,
		"priority": 47,
		"tasks": [{
		}]
	};
*/
})();
