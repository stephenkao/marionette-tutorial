/*global require, process, __dirname */

(function () {
	var express = require('express'),
		_ = require('underscore'),
		fs = require('fs'),

		consts = require('../server/_consts.js'),
		User = require('../server/_user'),
		Project = require('../server/_project'),
		Roadmap = require('../server/_roadmap'),
		Role = require('../server/_role'),

		app = express(),
		httpConfig = {
			PORT: 8888,
			ADDRESS: '127.0.0.1'
		};

	////////// AJAX calls
	app
		.get('/users', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(User.getUsers()));
		})
		.get('/user/:id', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(User.getUser(request.params.id)));
		})
		.get('/projects', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(Project.getProjects()));
		})
		.get('/project/:id', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(Project.getProject(request.params.id)));
		})
		.get('/roadmaps', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(Roadmap.getRoadmaps()));
		});


	////////// Static files
	app.get(/^(.+)$/, function(request, response){
		response.sendFile(process.cwd() + '/' + request.params[0]);
	});

	// "Start listening, not talking"
	// -- So says relationship expert Stephen Kao, M.D./P.I.
	app.listen(httpConfig.PORT, function() {
		console.log('Express server listening on port ' + httpConfig.PORT);
	});
})();
