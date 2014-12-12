/*global requirejs */
'use strict';

var require = {
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		'backbone.marionette': 'lib/backbone.marionette',
		templates: '../../target/templates'
	},
	urlArgs: 'bust=' + (new Date()).getTime()
};
