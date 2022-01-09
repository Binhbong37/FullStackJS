const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/connectDB');

const viewEngine = require('./config/viewEngine');
const webRoutes = require('./route/web');

const app = express();
app.use(cors({ origin: true }));

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

viewEngine(app);

app.use(webRoutes);

connectDB();

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
