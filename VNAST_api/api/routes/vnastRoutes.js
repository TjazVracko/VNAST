'use strict';
module.exports = function(app) {
    var taskController = require('../controllers/taskController');
    var userController = require('../controllers/userController');
    var authController = require('../controllers/authController');
    var commentController = require('../controllers/commentController');
    var groupController = require('../controllers/groupController');

    var verify = require('./verifyToken');
    
    // Authentication
    app.post('/register', authController.register_a_user);
    app.get('/me', verify.token, authController.who_am_i);
    app.post('/login', authController.login_a_user);
    app.get('/logout', authController.logout_a_user); //nepotrebno, a tukaj kot prikaz logike - za logout enostavno zbrišemo token client-side (po 24h pa itak treba ponovni login ker token expire-a)

    // Users
    app.route('/users')
        .get(verify.worker, userController.list_all_users)
        .post(verify.admin, userController.create_a_user);  // samo admin lahko tukaj kreira userje, drugače imamo registracio (glej zgoraj)

    app.route('/users/:userId')
        .get(verify.worker, userController.read_a_user)
        .put(verify.admin, userController.update_a_user)  // admin only
        .delete(verify.admin, userController.delete_a_user);  // admin only

    // Tasks 
    app.route('/tasks')
        .get(verify.worker, taskController.list_all_tasks)
        .post(verify.manager, taskController.create_a_task);  // <- poglej, uprabljamo middleware funkcijo za verifikacijo privilegijev

    app.route('/tasks/:taskId')
        .get(verify.worker, taskController.read_a_task)
        .put(verify.worker, taskController.update_a_task)  // če je tak lahko worker vse spreminja, namesto da bi lahko spremenil samo status, ampak naj bo
        .delete(verify.manager, taskController.delete_a_task);
    
    // taski prijavljenega workerja
    app.route('/tasks/get/mytasks')
        .get(verify.worker, taskController.read_my_tasks);

    // tasko prijavljenega managerja
    app.route('/tasks/get/managedtasks')
        .get(verify.manager, taskController.read_managed_tasks);

    // Comments
    app.route('/tasks/:taskId/comments')
    // app.route('/comments/:taskId')
        .get(verify.worker, commentController.list_all_comments)
        .post(verify.worker, commentController.create_a_comment);

    app.route('/tasks/:taskId/comments/:commentId')
        .delete(verify.worker, commentController.delete_a_comment)
        .put(verify.worker, commentController.update_a_comment);

    // Groups
    app.route('/groups')
        .get(verify.manager, groupController.list_all_groups)
        .post(verify.manager, groupController.create_a_group);

    // grupe, ki jih je naredo prijavljen manager
    app.route('/groups/get/managerof')
        .get(verify.manager, groupController.list_managed_groups);

    // grupe, v katerih je prijavljen worker član
    app.route('/groups/get/memberin')
        .get(verify.worker, groupController.list_participating_groups);

    app.route('/groups/:groupId')
        .get(verify.worker, groupController.read_a_group)
        .put(verify.manager, groupController.update_a_group)
        .delete(verify.manager, groupController.delete_a_group);

    app.route('/groups/:groupId/workers')
        .get(verify.worker, groupController.read_all_workers_in_group)
        .post(verify.manager, groupController.assign_user_to_group)
        .delete(verify.manager, groupController.remove_user_from_group);

    app.route('/groups/:groupId/tasks')
        .get(verify.worker, groupController.read_all_tasks_in_group);
        

};