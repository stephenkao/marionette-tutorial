/*global require, global, module */

(function () {
	var _ = require('underscore'),
		eden = require('node-eden'),
		consts = require('./_consts.js'),
		User;

	User = {
		/**
		 * Given an index, create a user
		 *
		 * @param {number} index
		 * @return {!Object}
		 */
		createUser: function (index) {
			var uId = 'user' + index,
				firstName = (index % 2 === 0) ? eden.adam() : eden.eve(),
				lastName = (index % 2 === 0) ? eden.eve() : eden.adam(),
				projects = [],
				numProjects = _.random(2, 5),
				projectUserLookup = global.projectUserLookup,
				userProjectLookup = global.userProjectLookup,
				i = 0;

			// Generate this user's project ids
			for (i = 0; i < numProjects; ++i) {
				var pId = 'project' + _.random(0, consts.NUM_PROJECTS);
				if (!projectUserLookup.hasOwnProperty(pId)) {
					projectUserLookup[pId] = [];
				}
				projectUserLookup[pId].push(uId);
				projects.push(pId);
			}

			// Save the project ids in the lookup for ~relational stuff~
			userProjectLookup[uId] = projects;

			return {
				_id: uId,
				privilege: _.random(1, 4),
				displayName: [firstName, eden.word()].join(' '),
				projects: projects
			};
		}
	};

	module.exports = User;
})();
