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
		// Simulated AJAX
		_readFile = function (filename, onSuccess, onError) {
			fs.readFile(filename, function (error, data) {
				if (error) {
					if (onError) {
						onError(error);
					} else {
						console.log(error);
					}
				} else {
					onSuccess(data);
				}
			});
		},
		usersJson = require(__dirname + '/data/users.json'),
		usersLookup = _.indexBy(usersJson, '_id'),
		projectsJson = require(__dirname + '/data/projects.json'),
		projectsLookup = _.indexBy(projectsJson, '_id');

	////////// AJAX calls
	app
		.get('/users', function (request, response) {
			var newUsersJson, userProjects;

			// Swap project ids for project objects
			newUsersJson = _.map(usersJson, function (userObj, key, list) {
				// Don't overwrite the original object, you dum dum!
				var newUserObj = _.clone(userObj);

				if (newUserObj.hasOwnProperty('projects')) {
					var projectIds = _.uniq(_.pluck(newUserObj.projects, '_id')),
						userProjects = [];

					_.each(projectIds, function (id) {
						userProjects.push(projectsLookup[id]);
					});

					console.log(userProjects);
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
		.get('/project/:id', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(projectsLookup[request.params.id]));
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
