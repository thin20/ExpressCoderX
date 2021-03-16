require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const route = require('./routes');

const port = 3000;

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public'))); // use file static in public folder 
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// User cookie
app.use(cookieParser(process.env.SESSION_SECRET));

// connect mongooseDB
const db = require('./config/db/index');
db.connect();

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})