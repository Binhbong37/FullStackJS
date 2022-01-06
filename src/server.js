const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const viewEngine = require('./config/viewEngine');
const webRoutes = require('./route/web');

const app = express();

const port = process.env.PORT || 3737;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

app.use(webRoutes);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
