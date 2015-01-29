/*global module, process */
/**
 * A dictionary that contains all CONST values -- pretty simple schtuff!
 *
 * @author Stephen Kao
 */
(function () {
	var cwd = process.cwd(),
		consts;

	consts = {
		TODAY: Math.floor(new Date().getTime() / 1000),
		DAY_SPAN: 60 * 60 * 24,
		WEEK_SPAN: 60 * 60 * 24 * 7,
		MONTH_SPAN: 60 * 60 * 24 * 7 * 4,

		NUM_USERS: 40,
		NUM_PROJECTS: 10,
		NUM_ROADMAPS: 5,

		PROJECT_ROLES: [
			'ui',
			'ux',
			'dev',
			'pm'
		],
		PROJECT_ROADMAPS: [
			'reading',
			'editor',
			'standalone',
			'refresh',
			'coral',
			'stability'
		],
		TASK_TYPES: [
			'planning',
			'research',
			'design',
			'implementation',
			'followup'
		],
		UPDATE_TYPES: [
			'project created',
			'project updated',
			'document uploaded',
			'document edited'
		],

		FILES: {
			ROADMAPS: cwd + '/data/roadmaps.json',
			PROJECTS: cwd + '/data/projects.json',
			USERS: cwd + '/data/users.json',
			ROLES: cwd + '/data/roles.json'
		}
	};

	module.exports = consts;
})();
