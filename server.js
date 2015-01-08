/*global require, process, __dirname */

(function () {
	var express = require('express'),
		_ = require('underscore'),
		app = express(),
		httpConfig = {
			PORT: 8888,
			ADDRESS: '127.0.0.1'
		},
		// Simulated AJAX
		usersJson = require(__dirname + '/data/users.json'),
		usersLookup = _.indexBy(usersJson, 'id'),
		projectsJson = require(__dirname + '/data/projects.json'),
		projectsLookup = _.indexBy(projectsJson, 'id');

	////////// AJAX calls
	app
		.get('/users', function (request, response) {
			var newUsersJson, userProjects;

			// Swap project ids for project objects
			newUsersJson = _.map(usersJson, function (userObj, key, list) {
				// Don't overwrite the original object, you dum dum!
				var newUserObj = _.clone(userObj);

				if (newUserObj.hasOwnProperty('projects')) {
					var projectIds = _.uniq(newUserObj.projects),
						userProjects = [];

					_.each(projectIds, function (id) {
						userProjects.push(projectsLookup[id]);
					});

					newUserObj.projects = userProjects;
				}

				return newUserObj;
			});

			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(newUsersJson));
		})
		.get('/projects', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(projectsJson));
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
	// -- Relationship expert
	app.listen(httpConfig.PORT, function() {
		console.log('Express server listening on port ' + httpConfig.PORT);
	});
})();
