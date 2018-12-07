const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');


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
    .addPlugin(new webpack.DefinePlugin({
        'process.env.REACT_APP_API_ENTRYPOINT': JSON.stringify(process.env.REACT_APP_API_ENTRYPOINT),
    }))
    .getWebpackConfig()
;

module.exports = config;
