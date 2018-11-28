const express = require('express');
const path = require('path');
const fs = require('fs');

const indexTemplate = fs.readFileSync(path.resolve(__dirname, 'build/index.html'), 'utf8');

const app = express();

const ssr = require('./views/server');
app.get('/', (req, res) => {
    const { state, content } = ssr();
    console.log(content, state);

    res.send(
        indexTemplate
            .replace(/%%%CONTENT%%%/g, content)
    );
});

app.use('/', express.static(path.resolve(__dirname, 'build')));

app.disable('x-powered-by');
app.listen(process.env.PORT || 3000, function () {
    `app Server is now running on http://localhost:${process.env.PORT || 3000}`
});
