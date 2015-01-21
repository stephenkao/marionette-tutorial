/*global require, global, module */

(function () {
	var _ = require('underscore'),
		consts = require('./_consts.js'),
		Role;

	Role = {
		/**
		 * Go through each user in each project
		 * to create a pseudo-relational link
		 *
		 * @return {!Object}
		 */
		populateRoles: function () {
			var projectUserLookup = global.projectUserLookup,
				roles = [];

			_.each(projectUserLookup, function (users, projectId) {
				_.each(users, function (userId) {
					roles.push({
						project_id: projectId,
						user_id: userId
					});
				});
			});

			return roles;
		}
	};

	module.exports = Role;
})();
