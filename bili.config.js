const ts = require('rollup-plugin-typescript')

module.exports = {
	input: 'src/index.ts',
	plugins: [ts()]
}
