module.exports = function(config) {
	const cfgs = {
		basePath: '',
		frameworks: ['mocha', 'chai', 'karma-typescript'],
		files: ['test/**/*.ts', 'src/**/*.ts'],
		exclude: [],
		preprocessors: {
			'**/*.ts': ['karma-typescript']
		},
		karmaTypescriptConfig: {
			bundlerOptions: {
				entrypoints: /test.*\.ts$/,
				exclude: ['vue/types/vue', 'vuex/types/index']
			},
			compilerOptions: {
				module: 'commonjs'
			},
			tsconfig: './tsconfig.json'
		},
		reporters: ['progress', 'karma-typescript'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['ChromeHeadless'],
		singleRun: false,
		concurrency: Infinity,
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		}
	}
	if (process.env.TRAVIS) {
		cfgs.browsers = ['Chrome_travis_ci']
	}
	config.set(cfgs)
}
