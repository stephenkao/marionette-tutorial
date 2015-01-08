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
		////////// Simple AJAX calls
		.get('/users', function (request, response) {
			var newUsersJson, userProjects;

			// Swap project ids for project objects
			newUsersJson = _.map(usersJson, function (userObj, key, list) {
				// Don't overwrite the original object
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
