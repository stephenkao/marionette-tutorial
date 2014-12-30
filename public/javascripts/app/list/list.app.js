/*global define */

/**
 * A page application that manages the 'list' view
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone.marionette'
], function (
	// Libraries
	Marionette
) {
	'use strict';

	var ListApp, listApp;

	ListApp = Marionette.Controller.extend({
		initialize: function () {
		}
	});

	listApp = new ListApp();

	return listApp;
});
