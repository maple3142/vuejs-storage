module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'chai', 'karma-typescript'],
		files: [
			'test/**/*.js',
			'src/**/*.ts'
		],
		exclude: [
		],
		preprocessors: {
			'**/*.ts': ['karma-typescript']
		},
		karmaTypescriptConfig: {
			bundlerOptions: {
				resolve: {
					extensions: [
						'.ts',
						'.js'
					]					
				}
			},
			compilerOptions: {
				module: 'commonjs'
			},
			tsconfig: './tsconfig.json',
		},
		reporters: ['progress', 'karma-typescript'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		concurrency: Infinity
	})
}
