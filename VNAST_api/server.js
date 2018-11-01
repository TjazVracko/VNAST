var express = require('express'),
    app = express(),
    port = process.env.PORT || 27017,
    mongoose = require('mongoose'),
    Task = require('./api/models/vnastModel'), //created model loading here
    bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/VnastDB'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/vnastRoutes'); //importing route
routes(app); //register the route

// midlleware, intercepts wrong API calls and returns nicer message
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });


app.listen(port);


console.log('todo list RESTful API server started on port: ' + port);
