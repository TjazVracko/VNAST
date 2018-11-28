'use strict';
var bcrypt = require('bcryptjs');
var config = require('../../config');  
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

const { validationResult } = require('express-validator/check');

exports.list_all_users = function(req, res) {
    User.find({}, { password: 0 }, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.create_a_user = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    var new_user = new User({username: req.body.username, email: req.body.email, password: hashedPassword, privilege: req.body.privilege});

    new_user.save(function(err, user) {
        if (err) return res.status(500).send("There was a problem registering the user.")
        // // create a token
        // var token = jwt.sign({ id: user._id }, config.secret, {
        //   expiresIn: 86400 // expires in 24 hours
        // });
        // res.json({ auth: true, token: token });
        // Tukaj ne loginamo tega userja (preko JWT kreacije), ker tukaj admin verjetno en mass kreira userje
        res.json(user);
    });
};

exports.read_a_user = function(req, res) {
    User.find({_id: req.params.userId}, { password: 0 }, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    var new_user = req.body;

    if (req.body.password !== undefined) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    new_user.password = hashedPassword;
    }
    User.findOneAndUpdate({_id: req.params.userId}, new_user, {new: true, runValidators: true, fields: {password: 0} }, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function(req, res) {
    User.deleteOne({_id: req.params.userId}, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};
