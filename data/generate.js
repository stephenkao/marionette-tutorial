/*global require, global */

(function () {
	'use strict';

	var _ = require('underscore'),
		fs = require('fs'),
		eden = require('node-eden'),
		jf = require('jsonfile'),

		consts = require('./_consts.js'),
		User = require('./_user.gen'),
		Project = require('./_project.gen'),
		Role = require('./_role.gen'),

		usersJson = [],
		projectsJson = [],
		rolesJson = [],

		filename, i;

	jf.spaces = 8;

	// user:project map
	global.userProjectLookup = {};
	// project:user map
	global.projectUserLookup = {};

	// Generate the users
	filename = 'data/users.json';
	for (i = 0; i < consts.NUM_USERS; ++i) {
		usersJson.push(User.createUser(i));
	}
	jf.writeFileSync(filename, usersJson);
	console.log(filename + ': SUCCESS');

	// Generate the projects
	filename = 'data/projects.json';
	for (i = 0; i < consts.NUM_PROJECTS; ++i) {
		projectsJson.push(Project.createProject(i));
	}
	jf.writeFileSync(filename, projectsJson);
	console.log(filename + ': SUCCESS');

	// Populate the roles
	filename = 'data/roles.json';
	rolesJson = Role.populateRoles();
	jf.writeFileSync(filename, rolesJson);
	console.log(filename + ': SUCCESS');
})();
