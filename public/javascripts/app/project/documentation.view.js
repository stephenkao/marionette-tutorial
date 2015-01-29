/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	'lib/xdate',
	// Templates
	'templates/lesir/components/project/documentation'
], function (
	// Libraries
	Marionette,
	XDate
) {
	'use strict';

	var DocumentationView = Marionette.ItemView.extend({

		////////// Initialization
		template: lesir.components.project.documentation,

		////////// Rendering
		serializeData: function () {
			var project = this.model.attributes,
				lastUpdate = project.updates.sortBy('created').reverse()[0];

			return {
				projectTitle: project.title,
				lastUpdateTime: new XDate(lastUpdate.get('created')).toString('MM / dd / yy')
			};
		}
	});

	return DocumentationView;
});
