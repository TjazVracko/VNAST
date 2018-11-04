'use strict';
var mongoose = require('mongoose'),
    Group = mongoose.model('Groups');

exports.list_all_groups = function(req, res) {
    Group.find({}, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.read_a_group = function(req, res) {
    Group.find({_id: req.params.groupId}, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
}

exports.update_a_group = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.groupId}, req.body, {new: true}, function(err, group) {
    if (err)
        res.send(err);
    res.json(group);
    });
};

exports.create_a_group = function(req, res) {
    var new_group = new Group(req.body);
    new_group.created_by = req.user._id;
    new_group.save(function(err, group) {
    if (err)
        res.send(err);
    res.json(group);
    });
};

exports.delete_a_group = function(req, res) {
    Group.deleteOne({_id: req.params.groupId}, function(err, group) {
        if (err)
            res.send(err);
        res.json({ message: 'Group successfully deleted' });
    });
};

exports.assign_user_to_group = function(req, res) {

}