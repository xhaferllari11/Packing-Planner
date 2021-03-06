const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();


require('dotenv').config();
require('./config/database');


app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/users', require('./routes/api/users'));

app.use(require('./config/auth'));  //image access requires user signin
app.use('/api/images', require('./routes/api/images'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/trips', require('./routes/api/trips'));


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
