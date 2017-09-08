import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';
import path from 'path';

const config = {
    ...baseConfig,

    devtool: 'source-map',

    entry: {
        'web': './app/index',
        'oauth': './app/oauth/index',
        'login': './app/login/index'
    },

    output: {
        ...baseConfig.output,
        path: path.join(__dirname, 'static'),
        filename: '[name]-bundle.min.js',
        libraryTarget: 'var'
    },

    module: {
        ...baseConfig.module,

        rules: [
            ...baseConfig.module.loaders,

            {
                test: /\.global\.css$/,
                use: [{
                    loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader'
                )}]
            },

            {
                test: /^((?!\.global).)*\.css$/,
                use: [{
                    loader: ExtractTextPlugin.extract(
                        'style-loader',
                        'css-loader?modules&importLoaders=1&localIdentName=' +
                            '[name]__[local]___[hash:base64:5]'
                )}]
            }
        ]
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.DefinePlugin({
            __DEV__: false,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],

    target: 'web'
};

export default config;
