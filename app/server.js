const express = require('express');
const path = require('path');
const fs = require('fs');

const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'build/index.html'), 'utf8');

const app = express();

const ssr = require('./views/server');
app.get('/', (req, res) => {
    ssr().then(({ state, content, apolloState }) => {
        res.send(
            indexTemplate
                .replace(/%%%CONTENT%%%/g, content)
                .replace(/<\/head>/g, `<script>window.__REDUX_STATE = ${JSON.stringify(state)};window.__APOLLO_STATE=${JSON.stringify(apolloState)};</script></head>`)
        );
    });
});

app.use('/', express.static(path.resolve(__dirname, 'build')));

app.disable('x-powered-by');
app.listen(process.env.PORT || 3000, function () {
    console.log(`app Server is now running on http://localhost:${process.env.PORT || 3000}`)
});
