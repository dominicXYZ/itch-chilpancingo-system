const webpack = require('webpack');
const getPlugins = () => {
    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            names: 'vendor',
            minChunks: (m) => /node_modules/.test(m.context)
        })
    ];

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }, comments: false
        })
    );
  return plugins;
};

module.exports = {
    entry: './frontend/index.jsx',
    output:{
        path: __dirname + '/public/js',
        filename: '[name].bundle.js'
    },
    plugins: getPlugins(),
    module:{
        loaders:[
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /(\.css)$/,
                loaders: ['style-loader', 'css-loader']
            },
        ]
    }
}