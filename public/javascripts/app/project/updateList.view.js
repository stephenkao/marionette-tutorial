/*global define */

/**
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette',
	// Components
	'app/project/updateListItem.view'
], function (
	// Libraries
	Marionette,
	// Components
	UpdateListItemView
) {
	'use strict';

	var UpdateListView = Marionette.CollectionView.extend({

		////////// Initialization
		itemView: UpdateListItemView
	});

	return UpdateListView;
});
