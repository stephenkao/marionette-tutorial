/*global define */

/**
 * A compilation of string-manipulation utility functions
 *
 * @author Stephen Kao
 */
define([
], function (
) {
	'use strict';

	var stringUtils = {
		formatDate: function (timestamp) {
			var date = new Date(timestamp),
				month = date.getMonth() + 1,
				day = date.getDate(),
				year = (date.getFullYear() + '').slice(2);

			return [month, day, year].join(' / ');
		},
		getTimeDifference: function (startTime, endTime) {
			var startDate = new Date(startTime),
			    endDate = new Date(endTime),
			    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
			months -= startDate.getMonth() + 1;
			months += endDate.getMonth();
			return months <= 0 ? 0 : months;
		}
	};

	return stringUtils;
});
