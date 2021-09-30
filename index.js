'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
//require factory
const reg = require('./reg_numbers');
//require a routes file
const Routes = require('./regnumbers_routes');

const pg = require("pg");
const Pool = pg.Pool;

//use for SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

//add connectionString connect to reg_numbers database
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

//instantiate app
const app = express();
//create instance for reg factory function
const RegFact = reg(pool);
//create an instance for the routes logic that links my factories as well
const RoutesLogic = Routes(RegFact);

//initialise session middleware - flash-express depends
app.use(session({
    secret: 'this is my session string',
    resave: false,
    saveUninitialized: true
  }));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//middlewere to make public folder visible
app.use(express.static('public'));

app.use(bodyparser.urlencoded({extended: true}));

app.use(bodyparser.json()); 

//default route
app.get('/', RoutesLogic.home);
app.post('/add', RoutesLogic.addReg);

//make the port number to be configurable
let PORT = process.env.PORT || 3021;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});