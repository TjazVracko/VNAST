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
     * @apiSuccess {ID} _id ID of the user.
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
     * @apiSuccess {User[]} users Array of user objects (see GetUser for details).
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
     * @apiSuccess {ID} _id ID of the new user.
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
     * @apiSuccess {ID} _id ID of the user.
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
     * @apiParam (Path Param) {ID} :userId The User ID.
     * 
     * @apiParam {String} [username] Users username.
     * @apiParam {String} [password] Users password.
     * @apiParam {String='worker', 'manager', 'admin'} [privilege] Users privilege level.
     * @apiParam {String} [email] Users Email.
     *
     * @apiSuccess {String[]} privilege Privilege level of the updated user.
     * @apiSuccess {String} username Username of the updated user.
     * @apiSuccess {String} email Email of the updated user.
     * @apiSuccess {ID} _id ID of the updated user.
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
     * @apiParam (Path Param) {ID} :userId The User ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "message": "User successfully deleted"
                    }
     */
        .delete(verify.admin, userController.delete_a_user);  // admin only
       
        
    // Tasks 
    /**
     * @apiDefine TaskSucces
     * @apiSuccess {Number} priority Priority level of the task.
     * @apiSuccess {String} status Status of the task.
     * @apiSuccess {ID} _id ID of the task.
     * @apiSuccess {String} name Task name.
     * @apiSuccess {String} description Task description.
     * @apiSuccess {Date} time_limit DateTime limit for completing the task (ISO format).
     * @apiSuccess {Date} created_date DateTime this task was created.
     * @apiSuccess {ID} created_by UserID of task creator.
     * @apiSuccess {ID} assigned_to_worker UserID of the worker this task is assigned to.
     * @apiSuccess {ID} assigned_to_group GroupID of the group this task is assigned to.
     * @apiSuccess {File[]} documents Array of Files coresponding to this task.
     */
     /**  
     * @apiDefine TaskSuccesExample
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "priority": "3",
                        "status": [
                            "pending"
                        ],
                        "_id": "5c338c89c8f17f1180c6c550",
                        "name": "Test task2",
                        "description": "novi test task2",
                        "time_limit": "2019-02-11T14:55:11.500Z",
                        "assigned_to_worker": "5bdecc3ec43948178a11f72e",
                        "created_date": "2019-01-07T17:29:45.081Z",
                        "created_by": "5bd989d81746683b2d8511f6",
                        "documents": [
                            {
                                "_id": "5c33932c7acbb2257154978c",
                                "mimetype": "image/png",
                                "originalname": "screenshot.png",
                                "filename": "9dfe737e6321345ffba310a1758250e7",
                                "path": "uploads/9dfe737e6321345ffba310a1758250e7"
                            }
                        ]
                    }          
     */
    app.route('/tasks')
    /**
     * @api {get} /tasks Request task list
     * @apiName GetTasks
     * @apiGroup Tasks
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiSuccess {Task[]} tasks Array of Task objects (see GetTask for details).
     */
        .get(verify.worker, taskController.list_all_tasks)
    /**
     * @api {post} /tasks Create new Task
     * @apiName CreateTask
     * @apiGroup Tasks
     * 
     * @apiPermission manager
     *
     * @apiParam {String} name Task name.
     * @apiParam {String} description Task description.
     * @apiParam {Number{1-5}} priority Priority level of the task.
     * @apiParam {Date} [time_limit] DateTime limit for completing the task (ISO format).
     * @apiParam {String='pending', 'ongoing', 'canceled', 'completed'} status Status of the task.
     * @apiParam {ID} [assigned_to_worker] UserID of the worker this task is assigned to.
     * @apiParam {ID} [assigned_to_group] GroupID of the group this task is assigned to.
     *
     * @apiUse TaskSucces
     * 
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "priority": "3",
                        "status": [
                            "pending"
                        ],
                        "_id": "5c338c89c8f17f1180c6c550",
                        "name": "Test task2",
                        "description": "novi test task2",
                        "time_limit": "2019-02-11T14:55:11.500Z",
                        "assigned_to_worker": "5bdecc3ec43948178a11f72e",
                        "created_date": "2019-01-07T17:29:45.081Z",
                        "created_by": "5bd989d81746683b2d8511f6",
                        "documents": []
                    }          
     */    
        .post(verify.manager, validate.createtask, taskController.create_a_task);  // <- poglej, uprabljamo middleware funkcijo za verifikacijo privilegijev

    app.route('/tasks/:taskId')
    /**
     * @api {get} /tasks/:taskID Request task by ID
     * @apiName GetTask
     * @apiGroup Tasks
     * 
     * @apiPermission worker
     * 
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     *
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiUse TaskSucces
     * @apiUse TaskSuccesExample
     */
        .get(verify.worker, taskController.read_a_task)
    /**
     * @api {put} /tasks/:taskId Update a Task
     * @apiName UpdateTask
     * @apiGroup Tasks
     * 
     * @apiPermission worker
     *
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     * 
     * @apiParam {String} [name] Task name.
     * @apiParam {String} [description] Task description.
     * @apiParam {Number{1-5}} [priority] Priority level of the task.
     * @apiParam {Date} [time_limit] DateTime limit for completing the task (ISO format).
     * @apiParam {String='pending', 'ongoing', 'canceled', 'completed'} [status] Status of the task.
     * @apiParam {ID} [assigned_to_worker] UserID of the worker this task is assigned to.
     * @apiParam {ID} [assigned_to_group] GroupID of the group this task is assigned to.
     *
     * @apiUse TaskSucces
     * @apiUse TaskSuccesExample
     */  
        .put(verify.worker, validate.updatetask, taskController.update_a_task)  // če je tak lahko worker vse spreminja, namesto da bi lahko spremenil samo status, ampak naj bo
    /**
     * @api {delete} /tasks/:taskId Delete a task
     * @apiName DeleteTask
     * @apiGroup Tasks
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                    {
                        "message": "Task successfully deleted"
                    }
     */    
        .delete(verify.manager, taskController.delete_a_task);

    
    app.route('/tasks/:taskId/files')
    /**
     * @api {post} /tasks/:taskId/files Add Files to task
     * @apiName AddFiles 
     * @apiGroup Files
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     * 
     * @apiParam {File} file1 First file to upload
     * @apiParam {File} file2 Second file to upload
     * @apiParam {File} file3... As many as you wish to upload (the key name is arbitrary, but they must be unique) (za uploadanje sem jaz v postmanu dal "form-data" (namesto raw ali x-www-form-encoded), ker le tak lahko file selectaš. pol pa key je lahko karkoli, zraven pa file)
     *
     * @apiUse TaskSucces
     * @apiUse TaskSuccesExample
     */  
        .post(verify.manager, upload.any(), taskController.upload_files); // fajli so v req.files

    app.route('/tasks/:taskId/files/:fileId')
    /**
     * @api {get} /tasks/:taskId/files/:fileId Download a File
     * @apiName GetFile 
     * @apiGroup Files
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     * @apiParam (Path Param) {ID} :fileId The File ID.
     * 
     *
     * @apiSuccess {File-Binary} file File download starts - "File download as attachment" (dobiš binary al nekaj) 
     */ 
        .get(taskController.download_a_file)
     /**
     * @api {delete} /tasks/:taskId/files/:fileId Delete a File
     * @apiName DeleteFile 
     * @apiGroup Files
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :taskId The Task ID.
     * @apiParam (Path Param) {ID} :fileId The File ID.
     * 
     *
     * @apiSuccess {String} message File Deletion success message
     * 
     * @apiSuccessExample {json} Success Response Example:
                    {
                        "message": "FILENAME was deleted"
                    }
     */ 
        .delete(verify.manager, taskController.delete_a_file);
    // https://github.com/expressjs/multer
    
    // taski prijavljenega workerja
    app.route('/tasks/get/mytasks')
    /**
     * @api {get} /tasks/get/mytasks Get tasks of logged in worker
     * @apiName GetMyTasks 
     * @apiGroup Tasks
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Task[]} tasks Tasks that are assigned to the worker corresponding to the JWT sent in the header
     * 
     * @apiSuccessExample {json} Success Response Example:
                    [
                        {
                            "priority": "3",
                            "status": [
                                "pending"
                            ],
                            "documents": [],
                            "created_date": "2019-01-07T18:20:38.698Z",
                            "_id": "5bd15ea4b62fee036e86fbf8",
                            "name": "Delam, delam, delam",
                            "description": "delam kot zamorc",
                            "Created_date": "2018-10-25T06:11:48.220Z",
                            "__v": 0,
                            "assigned_to_worker": "5bdecc3ec43948178a11f72e",
                            "created_by": "5bdecc29c43948178a11f72d"
                        },
                        {
                            "priority": "3",
                            "status": [
                                "pending"
                            ],
                            "_id": "5bdecd6da982d4395f43e650",
                            "name": "Faking delajte kreteni",
                            "description": "kot sem rekel, počasni ste hjoj",
                            "documents": [],
                            "created_date": "2018-11-04T10:43:57.999Z",
                            "__v": 0,
                            "assigned_to_worker": "5bdecc3ec43948178a11f72e",
                            "created_by": "5bdecc29c43948178a11f72d"
                        }
                    ]
     */ 
        .get(verify.worker, taskController.read_my_tasks);

    // taski prijavljenega managerja
    app.route('/tasks/get/managedtasks')
     /**
     * @api {get} /tasks/get/managedtasks Get tasks created by logged in manager
     * @apiName GetManagedTasks 
     * @apiGroup Tasks
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Task[]} tasks Tasks that were created by the manager corresponding to the JWT sent in the header
     * 
     * @apiSuccessExample {json} Success Response Example:
                    [
                        {
                            "priority": "4",
                            "status": [
                                "pending"
                            ],
                            "_id": "5c3389e2c8f17f1180c6c54e",
                            "name": "Test task",
                            "description": "novi test task",
                            "time_limit": "2019-02-11T14:55:11.500Z",
                            "documents": [],
                            "created_date": "2019-01-07T17:18:26.597Z",
                            "created_by": "5bd989d81746683b2d8511f6",
                            "__v": 0
                        },
                        {
                            "priority": "3",
                            "status": [
                                "pending"
                            ],
                            "_id": "5c338c89c8f17f1180c6c550",
                            "name": "Test task2",
                            "description": "novi test task2",
                            "time_limit": "2019-02-11T14:55:11.500Z",
                            "assigned_to_worker": "5bdecc3ec43948178a11f72e",
                            "documents": [],
                            "created_date": "2019-01-07T17:29:45.081Z",
                            "created_by": "5bd989d81746683b2d8511f6",
                            "__v": 0
                        }
                    ]
     */ 
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

    // grupe, ki jih je naredo prijavljen manager
    app.route('/groups/get/managerof')
    /**
     * @api {get} /groups/get/managerof Get groups created by logged in manager
     * @apiName GetManagedGroups 
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Group[]} groups Groups that were created by the manager corresponding to the JWT sent in the header
     * 
     * @apiSuccessExample {json} Success Response Example:
                    [
                        {
                            "workers": [
                                "5bdecc3ec43948178a11f72e"
                            ],
                            "_id": "5bded1712f5a630c0079b6af",
                            "name": "Group 1",
                            "created_date": "2018-11-04T11:01:05.711Z",
                            "created_by": "5bdecc29c43948178a11f72d",
                            "__v": 0
                        },
                        {
                            "workers": [
                                "5bdecc3ec43948178a11f72e",
                                "5bd98ed313a4e140743dbce6"
                            ],
                            "_id": "5bded17d2f5a630c0079b6b0",
                            "name": "Najbolji Group",
                            "created_date": "2018-11-04T11:01:17.805Z",
                            "created_by": "5bdecc29c43948178a11f72d",
                            "__v": 0
                        }
                    ]
     */ 
        .get(verify.manager, groupController.list_managed_groups);

    // grupe, v katerih je prijavljen worker član
    app.route('/groups/get/memberin')
    /**
     * @api {get} /groups/get/memberin Get groups logged in worker is member in
     * @apiName GetMyGroups 
     * @apiGroup Groups
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Group[]} groups Groups that are assigned to the worker corresponding to the JWT sent in the header
     * 
     * @apiSuccessExample {json} Success Response Example:
                    [
                        {
                            "workers": [
                                "5bdecc3ec43948178a11f72e"
                            ],
                            "_id": "5bded1712f5a630c0079b6af",
                            "name": "Group 1",
                            "created_date": "2018-11-04T11:01:05.711Z",
                            "created_by": "5bdecc29c43948178a11f72d",
                            "__v": 0
                        },
                        {
                            "workers": [
                                "5bdecc3ec43948178a11f72e",
                                "5bd98ed313a4e140743dbce6"
                            ],
                            "_id": "5bded17d2f5a630c0079b6b0",
                            "name": "Najbolji Group",
                            "created_date": "2018-11-04T11:01:17.805Z",
                            "created_by": "5bdecc29c43948178a11f72d",
                            "__v": 0
                        }
                    ]
     */ 
        .get(verify.worker, groupController.list_participating_groups);

    app.route('/groups')
        .get(verify.manager, groupController.list_all_groups)
        .post(verify.manager, validate.group, groupController.create_a_group);

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

    // Chats
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