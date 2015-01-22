/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	'lib/xdate',
	// Templates
	'templates/lesir/components/project/update'
], function (
	// Libraries
	Marionette,
	XDate,
	// Singletons
	stringUtils
) {
	'use strict';

	var UpdateListItemView = Marionette.ItemView.extend({

		////////// Initialization
		tagName: 'li',
		className: 'project__updateitem',
		template: lesir.components.project.updateListItem,

		serializeData: function () {
			return {
				title: this.model.get('title'),
				date: new XDate(this.model.get('created')),
				user: this.model.get('user').displayName
			};
		}
	});

	return UpdateListItemView;
});
