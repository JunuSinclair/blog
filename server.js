const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');

const PORT = process.env.PORT
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

const server = PORT ? app.listen(PORT, function(){
  console.log(`Express server has started on port ${PORT}`);
}) : app.listen(8080, function(){
  console.log(`Express server has started on port ${8080}`);
});


app.use(express.static(`${__dirname}/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


const router = require('./router/main')(app, fs);