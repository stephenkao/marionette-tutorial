/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/list/projectList'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var ProjectListView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.listapp.projectList
	});

	return ProjectListView;
});
