module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{png,json,ico,html,txt,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};