'use strict';
var mongoose = require('mongoose'),
    Group = mongoose.model('Groups'),
    User = mongoose.model('Users'),
    Task = mongoose.model('Tasks');

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

exports.list_managed_groups = function(req, res) {
    Group.find({created_by: req.user._id}, function(err, groups) {
        if (err)
            res.send(err);
        res.json(groups);
    });
};

exports.list_participating_groups = function(req, res) {
    Group.find({workers: req.user._id}, function(err, groups) {
        if (err)
            res.send(err);
        res.json(groups);
    });
};

exports.read_all_workers_in_group = function(req, res) {
    Group.find({_id: req.params.groupId}, function(err, group) {
        if (err)
            res.send(err);
        User.find({_id: {$in: group[0].workers}}, { password: 0 }, function(err, workers) {
            if (err)
                res.send(err);
            res.json(workers);
        });
    });
};

exports.assign_user_to_group = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.groupId}, {$push: {workers: req.body.userId}}, {new: true}, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.remove_user_from_group = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.groupId}, {$pull: {workers: req.body.userId}}, {new: true}, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};

exports.read_all_tasks_in_group = function(req, res) {
    Task.find({assigned_to_group: req.params.groupId}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};