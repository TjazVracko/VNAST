'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
    if (err)
        res.send(err);
    res.json(task);
    });
};


exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
    if (err)
        res.send(err);
    res.json(task);
    });
};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body,  {new: true, runValidators: true }, function(err, task) {
    if (err)
        res.send(err);
    res.json(task);
    });
};


exports.delete_a_task = function(req, res) {
    Task.deleteOne({_id: req.params.taskId}, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};

exports.read_my_tasks = function(req, res) {
    Task.find({assigned_to_worker: req.user._id}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};