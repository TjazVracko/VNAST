'use strict';
var mongoose = require('mongoose'),
    Message = mongoose.model('Messages'),
    ChatContainer = mongoose.model('ChatContainers'),
    Group = mongoose.model('Groups');

exports.list_all_chats = function(req, res) {
    ChatContainer.find({}, function(err, chats) {
        if (err)
            res.send(err);
        res.json(chats);
    });
};

//primer za pushanje participants v chatController
/*
exports.assign_user_to_group = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.groupId}, {$push: {workers: req.body.userId}}, {new: true}, function(err, group) {
        if (err)
            res.send(err);
        res.json(group);
    });
};
*/

//ustvari chat in mu dodeli oba udeleženca (ustvarjalca in komu pošiljamo)
//podatke komu pošiljamo podamo v bodyju (userId: ...)
exports.create_a_chat = function(req, res) {
    var new_chat = new ChatContainer();
    new_chat.participants = [req.user._id, req.body.userId];
    new_chat.save(function(err, chat) {
        if (err)
            res.send(err);
        res.json(chat);
    });
};

exports.delete_a_chat = function(req, res) {
    ChatContainer.find({_id: req.params.chatId}, function(err, chat) {
        if (err)
            res.send(err);
        Message.deleteMany({_id: {$in: chat[0].messages}}, function(err, messages) {
            if (err)
                res.send(err);
            ChatContainer.findOneAndDelete({_id: req.params.chatId}, function(err, chat) {
                if (err)
                    res.send(err);
                res.json({ message: 'Chat successfully deleted' });
            })
        });
    });
};

//vrne vse pogovore v katerim je uporabnik udeležen
exports.list_participating_chats = function(req, res) {
    ChatContainer.find({participants: req.user._id}, function(err, chats) {
        if (err)
            res.send(err);
        res.json(chats);
    });
};

exports.add_message = function(req, res) {
    var new_message = new Message();
    new_message.content = req.body.content;
    new_message.created_by = req.user._id;
    new_message.save(function(err, message) {
        ChatContainer.findOneAndUpdate({_id: req.params.chatId}, {$push: {messages: message._id}}, {new: true}, function(err, chat) {
            if (err)
            res.send(err);
        res.json(chat);
        });
    });
};

/*
//pomoč
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
*/

//vrne vsa sporočila iz /chat/:chatId
exports.list_all_messages = function(req, res) {
    ChatContainer.find({_id: req.params.chatId}, function(err, chat) {
        if (err)
            res.send(err);
        Message.find({_id: {$in: chat[0].messages}}, function(err, messages) {
            if (err)
                res.send(err);
            res.json(messages);
        });
    });
};

exports.create_group_chat = function(req, res) {
    Group.find({_id: req.params.groupId}, function(err, group) {
        if (err)
            res.send(err);
        var new_chat = new ChatContainer();
        new_chat.participants = group[0].workers;
        new_chat.assigned_to_group = group[0]._id;
        new_chat.save(function(err, chat) {
            if (err)
                res.send(err);
            res.json(chat);
        });
    });


};

exports.list_group_chats = function(req, res) {
    ChatContainer.find({assigned_to_group: req.params.groupId}, function(err, chats) {
        if (err)
            res.send(err);
        res.json(chats);
    });
};