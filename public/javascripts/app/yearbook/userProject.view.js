/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/yearbook/user'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var UserProjectView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.yearbook.project,
		tagName: 'li',
		className: 'project',

		serializeData: function () {
			debugger;
		}
	});

	return UserProjectView;
});
