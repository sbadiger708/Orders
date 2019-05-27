var express = require('express');
var app = express(); 
var port = process.env.PORT || 8000;
var morgan = require('morgan'); 
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
var router = express.Router(); 
var appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 
app.use('/api/', appRoutes);

app.get('/*', function(req, res) {
    res.sendFile('/public/index.html', { root: __dirname });
});

// <---------- REPLACE WITH YOUR MONGOOSE CONFIGURATION ---------->
mongoose.connect('mongodb://127.0.0.1:27017/testdb', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); 
    } else {
        console.log('Successfully connected to MongoDB');
    }
});


// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
