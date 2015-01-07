/*global require, process, __dirname */

(function () {
	var express = require('express'),
		app = express(),
		httpConfig = {
			PORT: 8888,
			ADDRESS: '127.0.0.1'
		},
	    _getUsers, _getProjects;

	app.use(require('express-promise')());

	_getUsers = function () {
		return require(__dirname + '/data/users.json');
	};
	_getProjects = function () {
		return require(__dirname + '/data/projects.json');
	};

	////////// AJAX calls
	app
		////////// Simple AJAX calls
		.get('/users', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(_getUsers()));
		})
		.get('/projects', function (request, response) {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(_getProjects()));
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
