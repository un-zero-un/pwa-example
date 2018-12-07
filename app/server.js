const express = require('express');
const path = require('path');
const ssr = require('./views/server').ssr;

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'build/static')));
app.use('/images', express.static(path.resolve(__dirname, 'build/images')));
app.use('/sw.js', express.static(path.resolve(__dirname, 'build/sw.js')));
app.use('/favicon.ico', express.static(path.resolve(__dirname, 'build/favicon.ico')));
app.use('/app.webmanifest', express.static(path.resolve(__dirname, 'build/app.webmanifest')));

let bundleManifest = null;

function renderHtml(content, css, state = null, apolloState = null, helmet = null) {
    if (null === bundleManifest) {
        bundleManifest = require('./build/manifest.json');
    }

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/app.webmanifest">
    <link rel="stylesheet" href="${bundleManifest['static/app.css']}" />
    ${helmet ? helmet.title.toString() : ''}
    ${helmet ? helmet.meta.toString() : ''}
    ${helmet ? helmet.link.toString() : ''}
    <script>
        window.__REDUX_STATE = ${JSON.stringify(state)};
        window.__APOLLO_STATE=${JSON.stringify(apolloState)};
    </script>
</head>
<body>
    <div id="root">${content}</div>
    <style id="jss-server-side"><style id="jss-server-side">${css}</style></style>
    <script src="${bundleManifest['static/app.js']}"></script>
</body>
</html>
    `;
}


app.get('/*', (req, res) => {
    console.log(`Displaying ${req.url}`);

    if ('false' === process.env.SSR_ENABLED) {
        res.send(renderHtml('', ''));

        return;
    }

    ssr(process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT, req.url)
        .then(({state, content, apolloState, helmet, css}) => {
            res.send(renderHtml(content, css, state, apolloState, helmet));
        })
        .catch((e) => {
            console.error(e);

            res.send(500);
        });
});

app.disable('x-powered-by');
app.listen(process.env.SSR_PORT || 3001, function () {
    console.log(`app Server is now running on http://localhost:${process.env.SSR_PORT || 3001}`);
});
