const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin')
const AddAsset = require('add-asset-html-webpack-plugin')
const HappyPack = require('happypack')
const threadPool = HappyPack.ThreadPool({ size: 3 })
const outputPath = path.resolve(__dirname, 'public')

module.exports = {
	entry: [
		'babel-polyfill',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'./src/index.js'
	],
	output: {
		filename: 'index-[hash].js',
		path: outputPath,
		publicPath: '/public'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'eval-sourcemap',
	devServer: {
		host: 'localhost',
		port: 8080,
		compress: true,
		historyApiFallback: true,
		hot: true,
		contentBase: outputPath,
		publicPath: '/public/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index_template.html',
			filename: './index.html',
			alwaysWriteToDisk: true
		}),
		new HappyPack({
			id: 'js',
			verbose: false,
			threadPool: threadPool,
			loaders: ['babel-loader?cacheDirectory']
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
				loaders: [ 'style-loader', 'css-loader', 'postcss-loader' ]
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
