const express = require('express');
const path = require('path');
const fs = require('fs');
const ssr = require('./views/server');

const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'build/index.html'), 'utf8');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'build/static')));
app.use('/images', express.static(path.resolve(__dirname, 'build/images')));
app.use('/sw.js', express.static(path.resolve(__dirname, 'build/sw.js')));
app.use('/favicon.ico', express.static(path.resolve(__dirname, 'build/favicon.ico')));
app.use('/app.webmanifest', express.static(path.resolve(__dirname, 'build/app.webmanifest')));

function renderHtml(content, css, state = null, apolloState = null, helmet = null) {
    return indexTemplate
        .replace(/<div id="root"><\/div>/g, `<div id="root">${content}</div>`)
        .replace(/<style id="jss-server-side"><\/style>/g, `<style id="jss-server-side">${css}</style>`)
        .replace(/<\/head>/g, `
                <script>
                    window.__REDUX_STATE = ${JSON.stringify(state)};
                    window.__APOLLO_STATE=${JSON.stringify(apolloState)};
                </script>
                ${helmet ? helmet.title.toString() : ''}
                ${helmet ? helmet.meta.toString() : ''}
                ${helmet ? helmet.link.toString() : ''}
            </head>
        `);
}

app.get('/*', (req, res) => {
    console.log(`Displaying ${req.url}`);

    if ('false' === process.env.SSR_ENABLED) {
        res.send(renderHtml('', ''));

        return;
    }


    ssr(req.url)
        .then(({ state, content, apolloState, helmet, css }) => {
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
