/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/list/project'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var ProjectListItemView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.list.projectListItem,
		tagName: 'li',
		className: 'row project--listitem'
	});

	return ProjectListItemView;
});
