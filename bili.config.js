module.exports = {
	format: ['umd', 'umd-min', 'es', 'cjs'],
	input: 'src/index.ts',
	output: {
		dir: 'dist',
		moduleName: 'vuejsStorage',
		fileName: 'vuejs-storage.[format][min][ext]',
		format: ['umd', 'cjs', 'es', 'umd-min', 'cjs-min', 'es-min'],
	},
}
