/*global define */

/**
 * A Model that represents a project
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'backbone'
], function (
	// Libraries
	Backbone
) {
	'use strict';

	var ProjectModel = Backbone.Model.extend({

		////////// Fields
		defaults: {
			title: '',
			taskCollection: null,
			updateCollection: null,
			userCollection: null,
			progress: 0,
			startTime: new Date().getTime(),
			endTime: new Date().getTime(),
			priority: 0 // This does NOT have a set limit (currently)
		},

		////////// Initialization
		/**
		 * Initialize this Model and instantiate the nested Collections/Models
		 *
		 * VOID->VOID
		 */
		initialize: function () {
			this.taskCollection = new Backbone.Collection();
			this.updateCollection = new Backbone.Collection();
			this.taskCollection = new Backbone.Collection();
		},

		////////// Personnel
		/**
		 * Add a user to this project
		 *
		 * @param {!UserModel} newUser
		 */
		addUser: function (newUser) {
			this.userCollection.add(newUser);
		},
		/**
		 * Remove a user from this project (RIP)
		 *
		 * @param {number} userId
		 */
		removeUser: function (userId) {
			this.userCollection.remove(userId);
		},

		////////// Priority
		/**
		 * Raise priority by N priority steps (1 by default)
		 *
		 * @param {number} numSteps
		 */
		raisePriority: function (numSteps) {
			numSteps = numSteps || 1;
			this.set('priority', this.get('priority') + (numSteps * ProjectModel.priorityStep));
		},
		/**
		 * Lower priority by N priority steps (1 by default)
		 *
		 * @param {number} numSteps
		 */
		lowerPriority: function (numSteps) {
			numSteps = numSteps || 1;
			this.set('priority', this.get('priority') - (numSteps * ProjectModel.priorityStep));
		}
	}, {
		/**
		 * A single step size of priority
		 *
		 * @type {number}
		 */
		priorityStep: 10
	});

	return ProjectModel;
});
