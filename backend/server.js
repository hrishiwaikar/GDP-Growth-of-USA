const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const graph_router = require('./routes/graph');

const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    })
);

app.use('/api', graph_router)
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
