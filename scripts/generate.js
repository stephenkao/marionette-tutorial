/*global require, global */

/**
 * Generates users, projects, roles, and roadmaps IN THAT ORDER
 *
 * @author Stephen Kao
 */
(function () {
	'use strict';

	var _ = require('underscore'),
		fs = require('fs'),
		eden = require('node-eden'),
		jf = require('jsonfile'),

		consts = require('../server/_consts'),
		User = require('../server/_user'),
		Project = require('../server/_project'),
		Roadmap = require('../server/_roadmap'),
		Role = require('../server/_role'),

		usersJson = [],
		projectsJson = [],
		roadmapsJson = [],
		rolesJson = [],

		filename, i;

	jf.spaces = 8;

	// user:project map
	global.userProjectLookup = {};
	// project:user map
	global.projectUserLookup = {};

	// Generate the users
	filename = './data/users.json';
	for (i = 0; i < consts.NUM_USERS; ++i) {
		usersJson.push(User.createUser(i));
	}
	jf.writeFileSync(filename, usersJson);
	console.log(filename + ': SUCCESS');

	// Generate the projects
	filename = './data/projects.json';
	for (i = 0; i < consts.NUM_PROJECTS; ++i) {
		projectsJson.push(Project.createProject(i));
	}
	jf.writeFileSync(filename, projectsJson);
	console.log(filename + ': SUCCESS');

	// Populate the roadmaps
	filename = './data/roadmaps.json';
	roadmapsJson = Roadmap.populateRoadmaps();
	jf.writeFileSync(filename, roadmapsJson);
	console.log(filename + ': SUCCESS');

	// Populate the roles
	filename = './data/roles.json';
	rolesJson = Role.populateRoles();
	jf.writeFileSync(filename, rolesJson);
	console.log(filename + ': SUCCESS');
})();
