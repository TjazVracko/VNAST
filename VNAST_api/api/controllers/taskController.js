'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks'),
    Document = mongoose.model('Documents');

const { validationResult } = require('express-validator/check');

exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_task = function(req, res) {
    // validation errors?
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // create task
    var new_task = new Task(req.body);
    new_task.created_by = req.user._id;
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
    Task.findById(req.params.taskId, function(err, task){
        if (err)
            res.send(err);
        else {
            // zbriši datoteke, ki pripadajo tasku:
            task.documents.forEach((file, nekaj) => {
                if(file)
                    fs.unlink(path.resolve(file.path), (err) => {
                        if (err) 
                            console.log(err);
                        else{
                            console.log(file.filename + ' was deleted');
                        }
                    });
            });

            //nato zbriši celi task
            Task.deleteOne({_id: req.params.taskId}, function(err) {
                if (err)
                    res.send(err);
                
                res.json({ message: 'Task successfully deleted' });
            });
        }
    });
};

exports.read_my_tasks = function(req, res) {
    Task.find({assigned_to_worker: req.user._id}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};

exports.read_managed_tasks = function(req, res) {
    Task.find({created_by: req.user._id}, function(err, tasks) {
        if (err)
            res.send(err);
        res.json(tasks);
    });
};

// FILES: 

exports.upload_files = function(req, res) {
    var docArr = []
    req.files.forEach(file => {
        // append to arr
        var doc = new Document({mimetype: file.mimetype, originalname: file.originalname, filename: file.filename, path: file.path})
        docArr.push(doc);
    });

    Task.findOneAndUpdate({_id: req.params.taskId}, {$push: {documents: docArr}}, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });

};

// to download files use this
const path = require('path');

exports.download_a_file = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        else {
            // read files
            var file = task.documents.filter(f => f._id == req.params.fileId)[0];
            if(typeof(file) !== 'undefined')
                res.download(path.resolve(file.path), file.originalname);
            else
                res.send({message: 'File does not exist'})
        }
    });

};

const fs = require('fs');
exports.delete_a_file = function(req, res) {
    // get file path
    Task.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        else {
            var file = task.documents.filter(f => f._id == req.params.fileId)[0];
            console.log(file);
            if(typeof(file) !== 'undefined'){
                 // remove file from system
                fs.unlink(path.resolve(file.path), (err) => {
                    if (err) 
                        console.log(err);
                    else{
                        console.log(file.filename + ' was deleted');

                        // update DB entry
                        Task.findOneAndUpdate({_id: req.params.taskId}, {$pull: {documents:{_id: req.params.fileId}}}, {new: true}, function(err, group) {
                            if (err)
                                res.send(err);
                            else{
                                res.json({message: file.originalname + ' was deleted'});
                            }
                        });
                    }
                    
                });
            } else {
                res.send({message: 'File does not exist'})
            }
           
        }
    });
};