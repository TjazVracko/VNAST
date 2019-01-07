'use strict';
module.exports = function(app) {
    var taskController = require('../controllers/taskController');
    var userController = require('../controllers/userController');
    var authController = require('../controllers/authController');
    var commentController = require('../controllers/commentController');
    var groupController = require('../controllers/groupController');
    var chatController = require('../controllers/chatController');

    var verify = require('./verifyToken');
    var multer  = require('multer')
    var upload = multer({ dest: 'uploads/' });

    var validate = require('./validation');
    
    // Authentication
    /**
     * @api {post} /register Register new user
     * @apiName RegisterUser
     * @apiGroup Authentication
     *
     * @apiParam {String} username Users username.
     * @apiParam {String} password Users password.
     * @apiParam {String='worker', 'manager', 'admin'} privilege Users privilege level.
     * @apiParam {String} [email] Users Email.
     *
     * @apiSuccess {Boolean} auth Success of authentication.
     * @apiSuccess {String} token JSON Web token used for authentication/authorisation.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "auth": true,
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDk4OWQ4MTc0NjY4M2IyZDg1MTFmNiIsImlhdCI6MTU0Njg2MDM5NCwiZXhwIjoxNTQ2OTQ2Nzk0fQ.IYaMtOVonFUHJOZ4ZvyhdE3diiMMlFMmXBG42MXQhwc"
                    }
     * 
     */
    app.post('/register', validate.register, authController.register_a_user);
    
    /**
     * @api {post} /login Login existing user
     * @apiName LoginUser
     * @apiGroup Authentication
     *
     * @apiParam {String} username Users username.
     * @apiParam {String} password Users password.
     *
     * @apiSuccess {Boolean} auth Success of authentication.
     * @apiSuccess {String} token JSON Web token used for authentication/authorisation.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "auth": true,
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZDk4OWQ4MTc0NjY4M2IyZDg1MTFmNiIsImlhdCI6MTU0Njg2MDM5NCwiZXhwIjoxNTQ2OTQ2Nzk0fQ.IYaMtOVonFUHJOZ4ZvyhdE3diiMMlFMmXBG42MXQhwc"
                    }
     * 
     */
    app.post('/login', authController.login_a_user);
    
    /**
     * @api {get} /me Request user info based on Auth token
     * @apiName GetSelf
     * @apiGroup Authentication
     *
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiSuccess {String[]} privilege Privilege level of user.
     * @apiSuccess {String} username Username of the user.
     * @apiSuccess {String} email Email of the user.
     * @apiSuccess {String} _id ID of the user.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "privilege": ["admin"],
                        "_id": "5bd989d81746683b2d8511f6",
                        "username": "admin",
                        "email": "admin.admin@admin.sem",
                    }
     */
    app.get('/me', verify.token, authController.who_am_i);

    /**
     * @api {get} /logout Log out the user
     * @apiName LogoutUser
     * @apiGroup Authentication
     *
     * @apiHeader {String} x-access-token Auth token.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "auth": false,
                        "token": null
                    }
     */
    app.get('/logout', authController.logout_a_user); //nepotrebno, a tukaj kot prikaz logike - za logout enostavno zbrišemo token client-side (po 24h pa itak treba ponovni login ker token expire-a)

    // Users
    /**
     
     */

    app.route('/users')
    /**
     * @api {get} /users Request user list
     * @apiName GetUser
     * @apiGroup Users
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiSuccess {User[]} users Array of user objects (see /users/:userId for details).
     */
        .get(verify.worker, userController.list_all_users)

    /**
     * @api {post} /users Create new user
     * @apiName CreateUser
     * @apiGroup Users
     * 
     * @apiPermission admin
     *
     * @apiParam {String} username Users username.
     * @apiParam {String} password Users password.
     * @apiParam {String='worker', 'manager', 'admin'} privilege Users privilege level.
     * @apiParam {String} [email] Users Email.
     *
     * @apiSuccess {String[]} privilege Privilege level of new user.
     * @apiSuccess {String} username Username of the new user.
     * @apiSuccess {String} email Email of the new user.
     * @apiSuccess {String} _id ID of the new user.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "privilege": ["manager"],
                        "_id": "5c3362d4b5302253e3ea2798",
                        "username": "manager23",
                        "email": "manager23@gmail.com",
                    }
     */
        .post(verify.admin, validate.register, userController.create_a_user);  // samo admin lahko tukaj kreira userje, drugače imamo registracio (glej zgoraj)

    
    app.route('/users/:userId')
    /**
     * @api {get} /users/:userId Request user by ID
     * @apiName GetUsers
     * @apiGroup Users
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :userId The User ID.
     *
     * @apiSuccess {String[]} privilege Privilege level of the user.
     * @apiSuccess {String} username Username of the user.
     * @apiSuccess {String} email Email of the user.
     * @apiSuccess {String} _id ID of the user.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "privilege": ["manager"],
                        "_id": "345678987654322345678",
                        "username": "klobasaman",
                        "email": "klobasaman@email.com",
                    }
     */
        .get(verify.worker, userController.read_a_user)


    /**
     * @api {put} /user/:userId Update existing user
     * @apiName UpdateUser
     * @apiGroup Users
     * 
     * @apiPermission admin
     *
     * @apiParam (Path Param) {String} :userId The User ID.
     * 
     * @apiParam {String} [username] Users username.
     * @apiParam {String} [password] Users password.
     * @apiParam {String='worker', 'manager', 'admin'} [privilege] Users privilege level.
     * @apiParam {String} [email] Users Email.
     *
     * @apiSuccess {String[]} privilege Privilege level of the updated user.
     * @apiSuccess {String} username Username of the updated user.
     * @apiSuccess {String} email Email of the updated user.
     * @apiSuccess {String} _id ID of the updated user.
     */
        .put(verify.admin, validate.userupdate, userController.update_a_user)  // admin only

    /**
     * @api {delete} /users/:userId Delete user by ID
     * @apiName DeleteUser
     * @apiGroup Users
     * 
     * @apiPermission admin
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :userId The User ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "message": "User successfully deleted"
                    }
     */
        .delete(verify.admin, userController.delete_a_user);  // admin only
       
        
    // Tasks 
    app.route('/tasks')
        .get(verify.worker, taskController.list_all_tasks)
        .post(verify.manager, validate.createtask, taskController.create_a_task);  // <- poglej, uprabljamo middleware funkcijo za verifikacijo privilegijev

    app.route('/tasks/:taskId')
        .get(verify.worker, taskController.read_a_task)
        .put(verify.worker, validate.updatetask, taskController.update_a_task)  // če je tak lahko worker vse spreminja, namesto da bi lahko spremenil samo status, ampak naj bo
        .delete(verify.manager, taskController.delete_a_task);

    
    app.route('/tasks/:taskId/files')
        .post(verify.manager, upload.any(), taskController.upload_files); // fajli so v req.files

    app.route('/tasks/:taskId/files/:fileId')
        .get(verify.worker, taskController.download_a_file)
        .delete(verify.manager, taskController.delete_a_file);
    // https://github.com/expressjs/multer
    
    // taski prijavljenega workerja
    app.route('/tasks/get/mytasks')
        .get(verify.worker, taskController.read_my_tasks);

    // taski prijavljenega managerja
    app.route('/tasks/get/managedtasks')
        .get(verify.manager, taskController.read_managed_tasks);

    // Comments
    app.route('/tasks/:taskId/comments')
    // app.route('/comments/:taskId')
        .get(verify.worker, commentController.list_all_comments)
        .post(verify.worker, validate.comment, commentController.create_a_comment);

    app.route('/tasks/:taskId/comments/:commentId')
        .delete(verify.worker, commentController.delete_a_comment)
        .put(verify.worker, commentController.update_a_comment);

    // Groups
    app.route('/groups')
        .get(verify.manager, groupController.list_all_groups)
        .post(verify.manager, validate.group, groupController.create_a_group);

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
        .get(verify.worker, groupController.read_all_tasks_in_group)

    app.route('/chats')
        .get(verify.manager, chatController.list_all_chats)
        .post(verify.worker, chatController.create_a_chat);
    
    app.route('/chats/get/memberin')
        .get(verify.worker, chatController.list_participating_chats);

    app.route('/chats/:chatId')
        .get(verify.worker, chatController.list_all_messages)
        .post(verify.worker, chatController.add_message)
        .delete(verify.worker, chatController.delete_a_chat);

    app.route('/groups/:groupId/chats')
        .get(verify.worker, chatController.list_group_chats)
        .post(verify.manager, chatController.create_group_chat);

    app.route('/groups/:groupId/chats/:chatId')
        .get(verify.worker, chatController.list_all_messages)
        .post(verify.worker, chatController.add_message)
        .delete(verify.manager, chatController.delete_a_chat);
};