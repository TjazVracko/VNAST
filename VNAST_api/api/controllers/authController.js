'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');    


exports.register_a_user =  function(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword,
      privilege : req.body.privilege
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.json({ auth: true, token: token });
    }); 
};

// TODO: projection nad passwordom nimamo več - to je slabo, naredi tak kot je blo prej
exports.who_am_i = function(req, res) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    // jwt.verify(token, config.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // User.findById(req.userId, { password: 0 }, function (err, user) {
    //     if (err) return res.status(500).send("There was a problem finding the user.");
    //     if (!user) return res.status(404).send("No user found.");
        
    //     res.json(user);
    //     });
    // });
    res.json(req.user._id);
};

exports.login_a_user = function(req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.json({ auth: true, token: token });
    })
};

exports.logout_a_user = function(req, res) {
    res.json({ auth: false, token: null });
};