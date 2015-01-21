/*global require, process, __dirname */

(function () {
	var express = require('express'),
		_ = require('underscore'),
		fs = require('fs'),
		app = express(),
		httpConfig = {
			PORT: 8888,
			ADDRESS: '127.0.0.1'
		},
		populateProject = function (projectId) {
			var newProjectObj = _.clone(projectsLookup[projectId]),
				// Populate users list
				usersList = _.map(newProjectObj.users, function (userRecord) {
					var userId = userRecord.user_id,
						populatedUser = usersLookup[userId];

					console.log(userId);
					delete userRecord.user_id;

					for (var key in populatedUser) {
						userRecord[key] = populatedUser[key];
					}

					return userRecord;
				}),
				// Populate updates list
				updatesList = _.map(newProjectObj.updates, function (updateRecord) {
					var userId = updateRecord.user,
					    populatedUser = usersLookup[userId];
					updateRecord.user = populatedUser;
					return updateRecord;
				});

			newProjectObj.users = usersList;
			newProjectObj.updates = updatesList;
			return newProjectObj;
		},
		populateUser = function (userId) {
			// Don't overwrite the original object, you dum dum!
			var newUserObj = _.clone(usersLookup[userId]);

			if (newUserObj.hasOwnProperty('projects')) {
				var projectIds = _.uniq(_.pluck(newUserObj.projects, '_id')),
					userProjects = [];

				_.each(projectIds, function (id) {
					userProjects.push(projectsLookup[id]);
				});

				newUserObj.projects = userProjects;
			}

			return newUserObj;
		},
		roadmapsJson = require(__dirname + '/data/roadmaps.json'),
		roadmapsLookup = _.indexBy(roadmapsJson, '_id'),
		usersJson = require(__dirname + '/data/users.json'),
		usersLookup = _.indexBy(usersJson, '_id'),
		projectsJson = require(__dirname + '/data/projects.json'),
		projectsLookup = _.indexBy(projectsJson, '_id');

	////////// AJAX calls
	app
		.get('/users', function (request, response) {
			var newUsersJson = [];

			// Swap project ids for project objects
			newUsersJson = _.map(usersJson, function (userObj) {
				return populateUser(userObj._id);
			});

			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(newUsersJson));
		})
		.get('/projects', function (request, response) {
			var newProjectsJson = [];

			// Swap user ids for user objects
			newProjectsJson = _.map(projectsJson, function (projectObj) {
				return populateProject(projectObj._id);
			});

			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(newProjectsJson));
		})
		.get('/project/:id', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(populateProject('project' + request.params.id)));
		})
		.get('/roadmaps', function (request, response) {
			var groupedProjects = _.groupBy(projectsJson, 'roadmap'),
				roadmapsJson = _.map(groupedProjects, function (projects, title) {
					return {
						title: title,
						projects: projects
					};
				});

			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(roadmapsJson, 'roadmap'));
		});


	////////// Static files
	app.get(/^(.+)$/, function(request, response){
		response.sendFile(__dirname + request.params[0]);
	});

	// "Start listening, not talking"
	// -- So says relationship expert Stephen Kao, M.D./P.I.
	app.listen(httpConfig.PORT, function() {
		console.log('Express server listening on port ' + httpConfig.PORT);
	});
})();
