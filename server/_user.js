/*global require, global, module, process */

(function () {
	var _ = require('underscore'),
		eden = require('node-eden'),
		consts = require('./_consts.js'),
		jf = require('jsonfile'),
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
				var pId = 'project' + _.random(0, consts.NUM_PROJECTS - 1);
				if (!projectUserLookup.hasOwnProperty(pId)) {
					projectUserLookup[pId] = [];
				}
				projectUserLookup[pId].push(uId);
				projects.push(pId);
			}
			projects = _.uniq(projects);

			// Save the project ids in the lookup for ~relational stuff~
			userProjectLookup[uId] = projects;

			return {
				_id: uId,
				privilege: _.random(1, 4),
				displayName: [firstName, lastName].join(' '),
				imageUrl: [
					'http://lorempixel.com/200/200',
					_.sample([
						'abstract',
						'animals',
						'business',
						'cats',
						'city',
						'food',
						'nightlife',
						'fashion',
						'people',
						'nature',
						'sports',
						'technics',
						'transport'
					]),
					_.random(1, 10)
				].join('/'),
				projects: projects
			};
		},

		////////// AJAX routes
		/**
		 * Retrieve all users (shallow population)
		 *
		 * @return {!Object}
		 */
		getUsers: function () {
			var users = jf.readFileSync(consts.FILES.USERS);
			users = _.map(users, function (user) {
				return User.getUser(user._id);
			});
			return users;
		},
		/**
		 * Retrieve a user by id (shallow population)
		 *
		 * @param {number} userId
		 * @return {!Object}
		 */
		getUser: function (userId) {
			var users = _.indexBy(jf.readFileSync(consts.FILES.USERS), '_id'),
				projects = _.indexBy(jf.readFileSync(consts.FILES.PROJECTS), '_id'),
				thisUser = users[userId];

			// Populate projects list
			thisUser.projects = _.map(thisUser.projects, function (projectReference, key) {
				return projects[projectReference];
			});

			return thisUser;
		}
	};

	module.exports = User;
})();
