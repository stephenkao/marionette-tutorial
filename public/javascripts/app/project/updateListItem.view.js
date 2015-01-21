/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Singletons
	'singleton/stringUtils',
	// Templates
	'templates/lesir/components/project/update'
], function (
	// Libraries
	Marionette,
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
				date: stringUtils.formatDate(this.model.get('timestamp') * 1000),
				user: this.model.get('user').displayName
			};
		}
	});

	return UpdateListItemView;
});
