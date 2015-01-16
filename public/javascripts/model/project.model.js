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
			title: '',
			phases: null,
			updates: null,
			tasks: null,
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
		 * VOID->VOID
		 */
		initialize: function () {
			// Translate timestamps into milliseconds for JavaScript
			var startTime = this.get('startTime'),
				endTime = this.get('endTime');
			this.set('startTime', startTime * 1000);
			this.set('endTime', endTime * 1000);

			this.set('phases', new Backbone.Collection());
			this.set('tasks', new Backbone.Collection());
			this.set('updates', new Backbone.Collection());
		},
		parse: function (response) {
			var updateRecords = response.updates,
				updateCollection = this.get('updates'),
				phaseRecords = response.phases,
			    	phaseCollection = this.get('phases');

			// Save updates
			updateRecords.forEach(function (updateRecord) {
				updateCollection.add(updateRecord);
			});
			updateCollection.trigger('reset');

			// Save phases
			phaseRecords.forEach(function (phaseRecord) {
				// Extend the phase record so the D3 Gantt library can understand it
				phaseRecord = _.extend(phaseRecord, {
					startDate: new Date(phaseRecord.startTime * 1000),
					endDate: new Date(phaseRecord.endTime * 1000),
					taskName: phaseRecord.title
				});
				phaseCollection.add(phaseRecord);
			});
			phaseCollection.trigger('reset');
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
