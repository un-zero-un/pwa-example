const Encore = require('@symfony/webpack-encore');

let config = Encore
    .setOutputPath('views/')
    .setPublicPath('/')
    .disableSingleRuntimeChunk()
    .enableReactPreset()
    .enableTypeScriptLoader()
    .enableSassLoader()
    .cleanupOutputBeforeBuild()
    .addEntry('server', './src/server.tsx')
    .enableSourceMaps(false)
    .enableVersioning(false)
    .getWebpackConfig()
;

module.exports = {
    ...config,
    target: 'node',
    output: {
        ...config.output,
        library:       '',
        libraryTarget: 'commonjs',
    },
};
