/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'underscore',
	'backbone.marionette',
	// Templates
	'templates/lesir/components/yearbook/user',
	'templates/lesir/components/yearbook/project'
], function (
	// Libraries
	_,
	Marionette
) {
	'use strict';

	var UserListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.yearbook.userListItem,
		tagName: 'li',
		className: 'user--yearbook',

		serializeData: function () {
			var user = this.model.attributes,
				today = new Date().getTime() / 1000;

			return {
				displayName: user.displayName,
				imageUrl: user.imageUrl,
				projects: _.each(user.projects, function (project) {
					var phasesLen = project.phases.length,
						currentPhase;

					// Determine the current phase of the project
					currentPhase = _.findWhere(project.phases, function (phase) {
						return (today < phase.endTime && today > phase.startTime);
					});

					// ...or default to the last phase
					if (!currentPhase) {
						currentPhase = project.phases[phasesLen - 1];
					}

					project.currentPhase = currentPhase.title;

					return project;
				})
			};
		}
	});

	return UserListItemView;
});
