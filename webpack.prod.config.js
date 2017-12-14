const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AddAsset = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')
const threadPool = HappyPack.ThreadPool({ size: 3 })
const outputPath = path.resolve(__dirname, 'public')
const ScriptPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
	entry: [
		'babel-polyfill',
		'./src/index.js'
	],
	output: {
		filename: 'index-[hash].js',
		path: outputPath,
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new ExtractTextPlugin('styles-[hash].css'),
		new HtmlWebpackPlugin({
			template: './src/index_template.html',
			filename: './index.html',
			alwaysWriteToDisk: true
		}),
		new ScriptPlugin({
			defaultAttribute: 'defer'
		}),
		new HappyPack({
			id: 'js',
			verbose: false,
			threadPool: threadPool,
			loaders: ['babel-loader?cacheDirectory']
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			mangle: false,
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		new HtmlWebpackHardDiskPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin()
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules|public/,
				loader: 'happypack/loader?id=js'
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader!postcss-loader',
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(ttf|eot|svg)$/, loader: 'file-loader'
			},
			{
				test: /\.json$/, loader: 'json-loader'
			}
		]
	}
}
