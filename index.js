'use strict'

import flash from 'express-flash';
import session from 'express-session';
import express, { static } from 'express';
import exphbs from 'express-handlebars';
import { urlencoded, json } from 'body-parser';
//require factory
import reg from './reg_numbers';
//require a routes file
import Routes from './regnumbers_routes';

import { Pool as _Pool } from "pg";
const Pool = _Pool;

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
app.use(static('public'));

app.use(urlencoded({extended: true}));

app.use(json()); 

//default route
app.get('/', RoutesLogic.home);
app.post('/addRegnumber', RoutesLogic.addReg);

//make the port number to be configurable
let PORT = process.env.PORT || 3021;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});