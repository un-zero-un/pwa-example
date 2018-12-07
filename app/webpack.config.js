const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const path = require('path');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


let config = Encore
    .setOutputPath('build/')
    .setPublicPath('/')
    .disableSingleRuntimeChunk()
    .enableReactPreset()
    .enableTypeScriptLoader()
    .enableSassLoader()
    .cleanupOutputBeforeBuild()
    .addEntry('static/app', './src/index.tsx')
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .addRule({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    })
    .addPlugin(new webpack.DefinePlugin({
        'process.env.REACT_APP_API_ENTRYPOINT': JSON.stringify(process.env.REACT_APP_API_ENTRYPOINT),
        'process.env.REACT_APP_USE_SERVICE_WORKER': JSON.stringify(process.env.REACT_APP_USE_SERVICE_WORKER),
    }))
    .addPlugin(new ServiceWorkerWebpackPlugin({
        entry:    path.join(__dirname, 'src/service-worker.js'),
        excludes: ['**/.*', '**/*.map', '*.html'],
    }))
    .addPlugin(new CopyWebpackPlugin([{ from: 'public/app.webmanifest', to: 'build/app.webmanifest' }]))
    .getWebpackConfig()
;


if (!Encore.isProduction()) {
    config = {
        ...config,
        output:    {
            ...config.output,
            publicPath: 'https://localhost/',
        },
        devServer: {
            ...config.devServer,
            disableHostCheck: true,
        },
    };
}

module.exports = config;
