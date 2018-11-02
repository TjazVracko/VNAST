'use strict';
module.exports = function(app) {
    var taskController = require('../controllers/taskController');
    var userController = require('../controllers/userController');
    var authController = require('../controllers/authController');
    var commentController = require('../controllers/commentController');

    var verify = require('./verifyToken');
    
    // Authentication
    app.post('/register', authController.register_a_user);
    app.get('/me', verify.token, authController.who_am_i);
    app.post('/login', authController.login_a_user);
    app.get('/logout', authController.logout_a_user); //nepotrebno, a tukaj kot prikaz logike - za logout enostavno zbrišemo token client-side (po 24h pa itak treba ponovni login ker token expire-a)

    // Tasks 
    // TODO: update these routes
    app.route('/tasks')
        .get(taskController.list_all_tasks)
        .post(verify.manager, taskController.create_a_task);  // <- poglej, uprabljamo middleware funkcijo za verifikacijo privilegijev

    app.route('/tasks/:taskId')
        .get(taskController.read_a_task)
        .put(taskController.update_a_task)
        .delete(taskController.delete_a_task);

    // Users
    app.route('/users')
        .get(verify.worker, userController.list_all_users)
        .post(verify.admin, userController.create_a_user);  // samo admin lahko tukaj kreira userje, drugače imamo registracio (glej zgoraj)

    app.route('/users/:userId')
        .get(verify.worker, userController.read_a_user)
        .put(verify.admin, userController.update_a_user)  // admin only
        .delete(verify.admin, userController.delete_a_user);  // admin only

    //okej route?
    app.route('/comments/:taskId')
        .get(verify.worker, commentController.list_all_comments)
        .post(verify.worker, commentController.create_a_comment)   //kako pošljemo who_am_i kot parameter?
        .delete(verify.worker, commentController.delete_a_comment);
   };