/*global require, process, __dirname */

(function () {
	var express = require('express'),
		app = express(),
		httpConfig = {
			PORT: 8888,
			ADDRESS: '127.0.0.1'
		};

	////////// AJAX calls
	app
		.get('/users', function (request, response) {
			response.sendFile(__dirname + '/data/users.json');
		})
		.get('/projects', function (request, response) {
			response.sendFile(__dirname + '/data/projects.json');
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
