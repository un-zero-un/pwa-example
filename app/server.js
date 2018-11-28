const express = require('express');
const path = require('path');
const fs = require('fs');
const ssr = require('./views/server');

const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'build/index.html'), 'utf8');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'build/static')));
app.use('/favicon.ico', express.static(path.resolve(__dirname, 'build/favicon.ico')));

app.get('/*', (req, res) => {
    console.log(`Displaying ${req.url}`);

    ssr(req.url).then(({ state, content, apolloState }) => {
        res.send(
            indexTemplate
                .replace(/%%%CONTENT%%%/g, content)
                .replace(/<\/head>/g, `<script>window.__REDUX_STATE = ${JSON.stringify(state)};window.__APOLLO_STATE=${JSON.stringify(apolloState)};</script></head>`)
        );
    });
});

app.disable('x-powered-by');
app.listen(process.env.PORT || 3000, function () {
    console.log(`app Server is now running on http://localhost:${process.env.PORT || 3000}`)
});
