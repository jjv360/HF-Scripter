//
// WebPack config file

var webpack = require('webpack');

module.exports = {
    plugins: [],
    module: {
        rules: []
    }
}


// The app's starting file
module.exports.entry = __dirname + "/index.js";



// The final app's JS output file
module.exports.output = {
    path: __dirname + "/../dist/web-ui",
    filename: "index.js"
}



// Create the offline manifest file
// var OfflinePlugin = require('offline-plugin');
// module.exports.plugins.push(new OfflinePlugin({
//   autoUpdate: true
// }));


// Output an HTML file
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports.plugins.push(new HtmlWebpackPlugin({
	title: "HF Scripter",
	template: 'index.html.ejs'
}));



// Output a sourcemap
module.exports.devtool = "source-map";


// Compile support for ES6 classes and React etc
module.exports.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [require("babel-preset-env"), require("babel-preset-react")]
    }
});


// Compile support for CSS
module.exports.module.rules.push({
    test: /\.css$/,
    loaders: ["style-loader", "css-loader?modules"]
});


// Compile support for images and other media. We specify it should have a proper path and name, plus add the hash
// for cache busting purposes
module.exports.module.rules.push({
    test: /\.(svg|png|gif|jpg|wav)$/,
    loaders: ["file-loader?name=assets/[name]-[hash].[ext]"]
});


// Webpack dev server settings
module.exports.devServer = {
    contentBase: __dirname + "/../dist/web-ui/",
    // hot: true
}
