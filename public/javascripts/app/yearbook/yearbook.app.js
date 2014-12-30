/*global define */

/**
 * A page application that manages the 'yearbook' view
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

	var YearbookApp, yearbookApp;

	YearbookApp = Marionette.Controller.extend({
		initialize: function () {
		}
	});

	yearbookApp = new YearbookApp();

	return yearbookApp;
});
