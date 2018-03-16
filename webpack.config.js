const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, 'src', 'index.ts'),
	output: {
		filename: 'vuejs-storage.js',
		path: path.join(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: ['vuejsStorage']
	},
	module: {
		rules: [
			{
				loader: 'ts-loader',
				test: /\.ts/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	devtool: 'source-map',
	plugins: []
}
