/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Templates
	'templates/lesir/components/project/documentation'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var DocumentationView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.project.documentation,
		className: 'row',

		serializeData: function () {
			debugger;
		}
	});

	return DocumentationView;
});
