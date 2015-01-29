/*global define, lesir */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/project/updateListItem.view',
	// Templates
	'templates/lesir/components/project/history'
], function (
	// Libraries
	Marionette,
	// Components
	UpdateListItemView
) {
	'use strict';

	var UpdateListView = Marionette.CompositeView.extend({

		////////// Initialization
		tagName: 'ul',
		className: 'updatelist',
		template: lesir.components.project.history,
		itemView: UpdateListItemView,
		itemViewContainer: '.js_historylist'
	});

	return UpdateListView;
});
