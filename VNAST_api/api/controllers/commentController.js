'use strict';
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments');

exports.list_all_comments = function(req, res) {
    Comment.find({assigned_to_task: req.params.taskId}, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};

exports.create_a_comment = function(req, res) {
    var new_comment = new Comment(req.body);
    new_comment.assigned_to_task = req.params.taskId;

    //kako inicializiramo crated_by iz who_am_i?

    new_comment.save(function(err, comment) {
    if (err)
        res.send(err);
    res.json(comment);
    });
};

exports.delete_a_comment = function(req, res) {
    Comment.deleteOne({_id: req.params.commentId}, function(err, comment) {
        if (err)
            res.send(err);
        res.json({ message: 'Comment successfully deleted' });
    });
};