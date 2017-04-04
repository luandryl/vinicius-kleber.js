var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

/*
	Load all the external dependencies modules from expressjs to webpack
	ESTE CARALHO É IMPORTANTE
*/
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });


module.exports = {
	entry: './index.js',
	output: {
		path: './build',
		filename: 'app.build.js'
	},
	externals: nodeModules,
	module: {
		loaders: [{
			test: '/\.js$/',
			exclude: '/node_modules/',
			loader: 'babel-loader'
		}]
	}
}