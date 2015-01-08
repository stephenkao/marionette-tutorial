/*global define */

/**
 * A biiiiiiiig dictionary of all CONST-like values
 * This shouldn't be done in production -- it's just a nice organizational tool for my OCD.
 * It's also nice for referring to global values from within templates (via injected data).
 *
 * @author Stephen Kao
 */
define([
], function (
) {
	'use strict';

	var constants = {
		phaseTypes: {
			PLANNING: 'planning',
			RESEARCH: 'research',
			DESIGN: 'design',
			IMPLEMENTATION: 'implementation',
			FOLLOWUP: 'followup'
		},
		roadmapTypes: {
			READING: 'reading',
			STANDALONE: 'standalone'
		}
	};

	return constants;
});
