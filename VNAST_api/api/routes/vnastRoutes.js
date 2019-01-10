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
     * @api {put} /users/:userId Update existing user
     * @apiName UpdateUser
     * @apiGroup Users
     * 
     * @apiPermission admin
     * 
     * @apiHeader {String} x-access-token Auth token.
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
     * @api {post} /tasks Create new task
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
     * @api {put} /tasks/:taskId Update a task
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
        .post(upload.any(), taskController.upload_files); // fajli so v req.files

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
    /**
     * @api {get} /tasks/:taskId/comments Request comment list
     * @apiName GetComments 
     * @apiGroup Comments
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Comment[]} comments Array of Comment objects (see CreateComment for details).
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "_id": "5bdc9f063efba42be0125ed9",
                        "content": "Hello, this is my comment!",
                        "created_date": "2018-11-02T19:01:26.268Z",
                        "assigned_to_task": "5bdc985fc72fcf3c6c1446ff",
                        "__v": 0
                    },
                    {
                        "_id": "5be3596414489e158c6be032",
                        "content": "Hello PURO, this is my fifth comment!",
                        "created_date": "2018-11-07T21:30:12.236Z",
                        "assigned_to_task": "5bdc985fc72fcf3c6c1446ff",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    },
                    {
                        "_id": "5c361e5aa784c82e4cfc5b38",
                        "content": "What do we even have to do?",
                        "created_date": "2019-01-09T16:16:26.860Z",
                        "assigned_to_task": "5bdc985fc72fcf3c6c1446ff",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }
                ]
     */ 
        .get(verify.worker, commentController.list_all_comments)


    /**
     * @api {post} /tasks/:taskId/comments Create comment
     * @apiName CreateComment 
     * @apiGroup Comments
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :taskId The Task ID.
     * 
     * @apiSuccess {ID} _id ID of the comment.
     * @apiSuccess {String} content Content of the comment.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * @apiSuccess {ID} assigned_to_task ID of group chat is assigned to
     * @apiSuccessExample {json} Success Response Example: 
                    {
                        "_id": "5c361e5aa784c82e4cfc5b38",
                        "content": "What do we even have to do?",
                        "created_date": "2019-01-09T16:16:26.860Z",
                        "assigned_to_task": "5bdc985fc72fcf3c6c1446ff",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }
     */ 
    
        .post(verify.worker, validate.comment, commentController.create_a_comment);

    app.route('/tasks/:taskId/comments/:commentId')
    /**
     * @api {delete} /tasks/:taskId/comments/:commentId Delete comment by ID
     * @apiName DeleteComment
     * @apiGroup Comments
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :taskId The Task ID.
     * @apiParam (Path Param) {String} :commentId The Comment ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                {
                    "message": "Comment successfully deleted"
                }
     */
        .delete(verify.worker, commentController.delete_a_comment)


    /**
     * @api {put} /tasks/:taskId/comments/:commentId Update existing comment
     * @apiName UpdateComment 
     * @apiGroup Comments
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :taskId The Task ID.
     * @apiParam (Path Param) {String} :commentId The Comment ID.
     * 
     * @apiSuccess {ID} _id ID of the comment.
     * @apiSuccess {String} content Content of the comment.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * @apiSuccess {ID} assigned_to_task ID of group chat is assigned to
     * @apiSuccessExample {json} Success Response Example: 
                {
                    "_id": "5be3596414489e158c6be032",
                    "content": "Testing functionality of update comment",
                    "created_date": "2018-11-07T21:30:12.236Z",
                    "assigned_to_task": "5bdc985fc72fcf3c6c1446ff",
                    "created_by": "5bdb6eb4112b2538b0921dd0",
                    "__v": 0
                }
     */ 
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
    /**
     * @api {get} /groups Request group list
     * @apiName GetGroups 
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Group[]} groups Array of Group objects (see GetGroup for details).
     */ 
        .get(verify.manager, groupController.list_all_groups)


    /**
     * @api {post} /groups Create new group
     * @apiName CreateGroup
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiParam {String} name Group name.
     * 
     * @apiSuccess {User[]} workers Array of user objects.
     * @apiSuccess {ID} _id ID of the group.
     * @apiSuccess {String} name Name of the group.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * 
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "workers": [],
                        "_id": "5c360423312a132b04536e9d",
                        "name": "Rups best group",
                        "created_date": "2019-01-09T14:24:35.793Z",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }  
     */    
        .post(verify.manager, validate.group, groupController.create_a_group);

    app.route('/groups/:groupId')
    /**
     * @api {get} /groups/:groupId Request group by ID
     * @apiName GetGroups
     * @apiGroup Groups
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     *
     * @apiSuccess {User[]} workers Array of user objects.
     * @apiSuccess {ID} _id ID of the group.
     * @apiSuccess {String} name Name of the group.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * 
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "workers": [],
                        "_id": "5c360423312a132b04536e9d",
                        "name": "Rups best group",
                        "created_date": "2019-01-09T14:24:35.793Z",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    } 
     */
        .get(verify.worker, groupController.read_a_group)

    /**
     * @api {put} /groups/:groupId Update existing group
     * @apiName UpdateGroup
     * @apiGroup Groups
     * 
     * @apiPermission manager
     * 
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiParam (Path Param) {ID} :groupId The Group ID.
     * @apiParam {String} [name] Group name.
     * 
     * @apiSuccess {User[]} workers Array of user objects.
     * @apiSuccess {ID} _id ID of the group.
     * @apiSuccess {String} name Name of the group.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     *
     */
        .put(verify.manager, groupController.update_a_group)

    /**
     * @api {delete} /groups/:groupId Delete group by ID
     * @apiName DeleteGroup
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :groupId The Group ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                    {
                        "message": "Group successfully deleted"
                    }
     */
        .delete(verify.manager, groupController.delete_a_group); 

    app.route('/groups/:groupId/workers')
    /**
     * @api {get} /groups/:groupId/workers Request workers assigned to group
     * @apiName GetWorkers
     * @apiGroup Groups
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     *
     * @apiSuccess {User[]} workers Array of user objects.
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "privilege": [
                            "admin"
                        ],
                        "_id": "5bdb6eb4112b2538b0921dd0",
                        "username": "admin",
                        "email": "bla@gmail.com",
                        "__v": 0
                    },
                    {
                        "privilege": null,
                        "_id": "5bdb76f8cfe3c92dac94ff6a",
                        "username": "worker4",
                        "__v": 0,
                        "email": null
                    }
                ]
     */
        .get(verify.worker, groupController.read_all_workers_in_group)


    /**
     * @api {post} /groups/:groupId/workers Assign worker to group
     * @apiName AssignWorkerToGroup
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiParam (Path Param) {String} :groupId The Group ID.
     * @apiParam {String} userId ID of user being assigned to group.
     * 
     * @apiSuccess {User[]} workers Array of user objects.
     * @apiSuccess {ID} _id ID of the group.
     * @apiSuccess {String} name Name of the group.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * 
     * @apiSuccessExample {json} Success Response Example:
                   {
                        "workers": [
                            "5bfdaeef4d24193bd4fbef16",
                            "5bdb76f8cfe3c92dac94ff6a",
                            "5bdb6eb4112b2538b0921dd0"
                        ],
                        "_id": "5bfdaeef4d24193bd4fbef16",
                        "name": "group 1",
                        "created_date": "2018-11-27T20:54:07.355Z",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }  
     */    
        .post(verify.manager, groupController.assign_user_to_group)


    /**
     * @api {delete} /groups/:groupId/workers Remove worker from group
     * @apiName RemoveWorkerFromGroup
     * @apiGroup Groups
     * 
     * @apiPermission manager
     *
     * @apiParam (Path Param) {String} :groupId The Group ID.
     * @apiParam {String} userId ID of user being removed from group.
     * 
     * @apiSuccess {User[]} workers Array of user objects.
     * @apiSuccess {ID} _id ID of the group.
     * @apiSuccess {String} name Name of the group.
     * @apiSuccess {Date} created_date DateTime this group was created.
     * @apiSuccess {ID} created_by UserID of group creator.
     * 
     * @apiSuccessExample {json} Success Response Example:
                    {
                        "workers": [
                            "5bdb76f8cfe3c92dac94ff6a",
                            "5bdb6eb4112b2538b0921dd0"
                        ],
                        "_id": "5bfdaeef4d24193bd4fbef16",
                        "name": "group 1",
                        "created_date": "2018-11-27T20:54:07.355Z",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }  
     */  
        .delete(verify.manager, groupController.remove_user_from_group);

    app.route('/groups/:groupId/tasks')
    /**
     * @api {get} /groups/:groupId/tasks Request tasks assigned to group
     * @apiName GetTasks
     * @apiGroup Groups
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     *
     * @apiSuccess {Task[]} tasks Array of task objects.
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "priority": "2",
                        "status": [
                            "pending"
                        ],
                        "_id": "5bdc985fc72fcf3c6c1446ff",
                        "name": "First task",
                        "description": "First task description",
                        "documents": [],
                        "created_date": "2018-11-02T18:33:03.656Z",
                        "__v": 0,
                        "assigned_to_worker": "5bdb7af880d78818b83bb534",
                        "assigned_to_group": "5bfdaeef4d24193bd4fbef16"
                    }
                ]
     */

        .get(verify.worker, groupController.read_all_tasks_in_group)

    // Chats
    app.route('/chats')
    /**
     * @api {get} /chats Request chat list
     * @apiName GetChats
     * @apiGroup Chats
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     *
     * @apiSuccess {Chat[]} chats Array of chat objects (see CreateChat for details).
     */
        .get(verify.manager, chatController.list_all_chats)

    /**
     * @api {post} /chats Create new chat
     * @apiName CreateChat
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiParam {String} userId ID of user creating a chat with
     *
     * @apiSuccess {User[]} participants Array of User objects.
     * @apiSuccess {Message[]} messages Array of Message objects.
     * @apiSuccess {ID} _id ID of the new chat.
     * @apiSuccess {Date} created_date DateTime this task was created.

     * @apiSuccessExample {json} Success Response Example:
                {
                    "participants": [
                        "5bdb6eb4112b2538b0921dd0",
                        "5bdb7af880d78818b83bb534"
                    ],
                    "messages": [],
                    "_id": "5c36156486166c2b4cb556e3",
                    "created_date": "2019-01-09T15:38:12.234Z",
                    "__v": 0
                }
     */
        .post(verify.worker, chatController.create_a_chat);
    
    app.route('/chats/get/memberin')
     /**
     * @api {get} /chats/get/memberin Get chats participating in
     * @apiName GetMyChats 
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiSuccess {Chat[]} chats Chats that are assigned to the user corresponding to the JWT sent in the header
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "participants": [
                            "5bdb6eb4112b2538b0921dd0",
                            null
                        ],
                        "messages": [],
                        "_id": "5bff13fe0efecf1ec47c1fda",
                        "created_date": "2018-11-28T22:17:34.256Z",
                        "__v": 0
                    },
                    {
                        "participants": [
                            "5bdb6eb4112b2538b0921dd0",
                            "5bdb7af880d78818b83bb534"
                        ],
                        "messages": [],
                        "_id": "5c36156486166c2b4cb556e3",
                        "created_date": "2019-01-09T15:38:12.234Z",
                        "__v": 0
                    }
                ]
     */ 
        .get(verify.worker, chatController.list_participating_chats);

    app.route('/chats/:chatId')
    /**
     * @api {get} /chats/:chatId Request messages assigned to chat
     * @apiName GetMessages
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :chatId The Chat ID.
     *
     * @apiSuccess {Message[]} messages Array of message objects.
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "_id": "5c3618c35046b838886d8e16",
                        "created_date": "2019-01-09T15:52:35.259Z",
                        "content": "hello this is my first msg",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }
                ]
     */
        .get(verify.worker, chatController.list_all_messages)


   /**
     * @api {post} /chats/:chatId Add message to chat
     * @apiName AddMessageToChat
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :chatId The Chat ID.
     * @apiParam {String} content Message content.
     * 
     * @apiSuccessExample {json} Success Response Example:
                {
                    "participants": [
                        "5bdb6eb4112b2538b0921dd0",
                        "5bdb7af880d78818b83bb534"
                    ],
                    "messages": [
                        "5c3618c35046b838886d8e16"
                    ],
                    "_id": "5c36156486166c2b4cb556e3",
                    "created_date": "2019-01-09T15:38:12.234Z",
                    "__v": 0
                }
     */
        .post(verify.worker, chatController.add_message)

    
    
    /**
     * @api {delete} /chats/:chatId Delete chat by ID
     * @apiName DeleteChat
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {ID} :chatId The Chat ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                {
                    "message": "Chat successfully deleted"
                }
     */
        .delete(verify.worker, chatController.delete_a_chat);

    app.route('/groups/:groupId/chats')
    /**
     * @api {get} /groups/:groupId/chats Request chats assigned to group
     * @apiName GetGroupChats
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     *
     * @apiSuccess {Chat[]} messages Array of chat objects.
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "participants": [
                            "5bdb76f8cfe3c92dac94ff6a",
                            "5bdb6eb4112b2538b0921dd0"
                        ],
                        "messages": [],
                        "_id": "5c361a2f5fb78f39f87fe954",
                        "created_date": "2019-01-09T15:58:39.761Z",
                        "assigned_to_group": "5bfdaeef4d24193bd4fbef16",
                        "__v": 0
                    }
                ]
     */
        .get(verify.worker, chatController.list_group_chats)


    /**
     * @api {post} /groups/:groupId/chats Create new group chat
     * @apiName CreateGroupChat
     * @apiGroup Chats
     * 
     * @apiPermission manager
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     *
     * @apiSuccess {User[]} participants Array of User objects.
     * @apiSuccess {Message[]} messages Array of Message objects.
     * @apiSuccess {ID} _id ID of the new chat.
     * @apiSuccess {Date} created_date DateTime this task was created.
     * @apiSuccess {ID} assigned_to_group ID of group chat is assigned to

     * @apiSuccessExample {json} Success Response Example:
                {
                    "participants": [
                        "5bdb76f8cfe3c92dac94ff6a",
                        "5bdb6eb4112b2538b0921dd0"
                    ],
                    "messages": [],
                    "_id": "5c361ac3082a1e0bd091fdc0",
                    "created_date": "2019-01-09T16:01:07.822Z",
                    "assigned_to_group": "5bfdaeef4d24193bd4fbef16",
                    "__v": 0
                }
     */
        .post(verify.manager, chatController.create_group_chat);

    app.route('/groups/:groupId/chats/:chatId')
    /**
     * @api {get} /groups/:groupId/chats/:chatId Request messages assigned to group chat
     * @apiName GetGroupChatMessages
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     * @apiParam (Path Param) {String} :chatId The Chat ID.
     *
     * @apiSuccess {Message[]} messages Array of message objects.
     * 
     * @apiSuccessExample {json} Success Response Example:
                [
                    {
                        "_id": "5c361bed2a2e1327847431f2",
                        "created_date": "2019-01-09T16:06:05.220Z",
                        "content": "How is your work progressing?",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    },
                    {
                        "_id": "5c361cdb6e39c031c046baac",
                        "created_date": "2019-01-09T16:10:03.529Z",
                        "content": "We're behind schedule.",
                        "created_by": "5bdb6eb4112b2538b0921dd0",
                        "__v": 0
                    }
                ]
     */
        .get(verify.worker, chatController.list_all_messages)



    /**
     * @api {post} /groups/:groupId/chats/:chatId Add message to chat
     * @apiName AddMessageToChat
     * @apiGroup Chats
     * 
     * @apiPermission worker
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     * @apiParam (Path Param) {String} :chatId The Chat ID.
     * @apiParam {String} content Message content.
     * 
     * @apiSuccess {User[]} participants Array of User objects.
     * @apiSuccess {Message[]} messages Array of Message objects.
     * @apiSuccess {ID} _id ID of the chat.
     * @apiSuccess {Date} created_date DateTime this task was created.
     * @apiSuccess {ID} assigned_to_group ID of group chat is assigned to
     * 
     * @apiSuccessExample {json} Success Response Example:
                {
                    "participants": [
                        "5bdb76f8cfe3c92dac94ff6a",
                        "5bdb6eb4112b2538b0921dd0",
                        "5bdb6eb4112b2538b0921dd0"
                    ],
                    "messages": [
                        "5c361bed2a2e1327847431f2"
                    ],
                    "_id": "5c361ac3082a1e0bd091fdc0",
                    "created_date": "2019-01-09T16:01:07.822Z",
                    "assigned_to_group": "5bfdaeef4d24193bd4fbef16",
                    "__v": 0
                }
     */
        .post(verify.worker, chatController.add_message)


    /**
     * @api {delete} /groups/:groupId/chats/:chatId Delete group chat by ID
     * @apiName DeleteGroupChat
     * @apiGroup Chats
     * 
     * @apiPermission manager
     *
     * @apiHeader {String} x-access-token Auth token.
     * 
     * @apiParam (Path Param) {String} :groupId The Group ID.
     * @apiParam (Path Param) {String} :chatId The Chat ID.
     *
     * @apiSuccess {String} message Success message.
     * @apiSuccessExample {json} Success Response Example:
                {
                    "message": "Chat successfully deleted"
                }
     */
        .delete(verify.manager, chatController.delete_a_chat);
};