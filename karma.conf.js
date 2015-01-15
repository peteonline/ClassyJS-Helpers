module.exports = function(config) {
	config.set({
		basePath: 'src',
		files: [
			'../vendor/classyjs/build/classy.js',
			'Array.js',
			'ArrayTest.js',
			'String.js',
			'StringTest.js'
		],
		frameworks: ['jasmine'],
		browsers: ['PhantomJS']
	});
};
