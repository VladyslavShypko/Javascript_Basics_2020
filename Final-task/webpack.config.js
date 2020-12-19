const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/app.js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
            },
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
            },
			{
				test: /\.(sass|scss)$/,
				use: [
				MiniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
				]
          },
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'img',
				},
      }
        ]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	},
	plugins: [
        new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/styles.css'
		}),
		
       new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i
		})
    ],
	devServer: {
		port: 7700,
		open: true
	}
};