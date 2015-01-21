/*global require, global, module, process */

(function () {
	'use strict';

	var _ = require('underscore'),
		eden = require('node-eden'),
		jf = require('jsonfile'),

		consts = require('./_consts'),
		Project = require('./_project'),
		Roadmap;

	Roadmap = {
		/**
		 * Go through each project's roadmap
		 * to create a pseudo-relational link
		 *
		 * @return {!Object}
		 */
		populateRoadmaps: function () {
			var projects = jf.readFileSync(process.cwd() + '/data/projects.json'),
				roadmapsLookup = _.groupBy(projects, 'roadmap_id');

			return _.map(roadmapsLookup, function (projects, key) {
				return {
					_id: key,
					title: [eden.word(), eden.word()].join(' '),
					projects: _.pluck(projects, '_id')
				};
			});
		},

		////////// AJAX routes
		getRoadmaps: function () {
			var roadmaps = jf.readFileSync(process.cwd() + '/data/roadmaps.json');

			roadmaps = _.map(roadmaps, function (roadmap) {
				roadmap.projects = _.map(roadmap.projects, function (projectId) {
					return Project.getProject(projectId);
				});
				return roadmap;
			});

			return roadmaps;
		}
	};

	module.exports = Roadmap;
})();
