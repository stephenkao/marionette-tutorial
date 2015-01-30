/*global define */

/**
 * A Model that represents a project
 *
 * @author Stephen Kao
 */
define([
	// Libraries
	'underscore',
	'backbone'
], function (
	// Libraries
	_,
	Backbone
) {
	'use strict';

	var ProjectModel = Backbone.Model.extend({

		////////// Fields
		defaults: {
			_id: '',
			title: '',
			tasks: null,
			updates: null,
			progress: 0,
			startTime: 0,
			endTime: 0,
			priority: 0 // This does NOT have a set limit (currently)
		},

		////////// Initialization
		url: function () {
			return '/project/' + this.get('id');
		},
		/**
		 * Initialize this Model and instantiate the nested Collections/Models
		 *
		 * @param {ProjectRecord=} record
		 */
		initialize: function (record) {
			// Translate timestamps into milliseconds for JavaScript
			var startTime = this.get('startTime'),
				endTime = this.get('endTime');
			this.set('startTime', startTime * 1000);
			this.set('endTime', endTime * 1000);

			this.set('tasks', new Backbone.Collection());
			this.set('updates', new Backbone.Collection());

			// Hacky: The record might be passed into initialize from the containing Collection
			if (record && record.hasOwnProperty('updates')) {
				this.parse(record);
			}
		},
		parse: function (response) {
			var updateRecords = response.updates,
				updateCollection = this.get('updates'),
				taskRecords = response.tasks,
			    	taskCollection = this.get('tasks');

			// Save updates
			updateRecords.forEach(function (updateRecord) {
				updateRecord.created = updateRecord.created * 1000;
				updateCollection.add(updateRecord);
			});
			updateCollection.trigger('reset');

			// Save tasks
			taskRecords.forEach(function (taskRecord) {
				taskRecord.startTime *= 1000;
				taskRecord.endTime *= 1000;
				taskCollection.add(taskRecord);
			});
			taskCollection.trigger('reset');

			response.startTime = response.startTime * 1000;
			response.endTime = response.endTime * 1000;
			response.updates = updateCollection;
			response.tasks = taskCollection;

			return response;
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
		priorityStep: 10,
		/**
		 * A dictionary of roadmap categories
		 *
		 * @type {!Object.<!string, number>}
		 */
		roadmapTypes: {
			READING: 1,
			HUB: 2,
			EDITOR: 3,
			STANDALONE: 4
		}
	});

	return ProjectModel;
});
