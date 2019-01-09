const { body } = require('express-validator/check')


exports.register =  [
        body('username').exists().withMessage('Username must exits')
            .isAlphanumeric().withMessage('Username must be alphanumeric')
            .isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
        
        body('email').optional().isEmail().withMessage('Email must be valid').normalizeEmail(),

        body('password').exists().withMessage('Password must be provided')
            .isLength({min: 5}).withMessage('Password must be at least 5 characters long'),

        body('privilege').isIn(['worker', 'manager', 'admin']).withMessage('Privilege must be one of: worker, manager, admin')
        
    ];


exports.userupdate = [
    body('username').optional()
            .isAlphanumeric().withMessage('Username must be alphanumeric')
            .isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
        
        body('email').optional().isEmail().withMessage('Email must be valid').normalizeEmail(),

        body('password').optional()
            .isLength({min: 5}).withMessage('Password must be at least 5 characters long'),

        body('privilege').optional().isIn(['worker', 'manager', 'admin']).withMessage('Privilege must be one of: worker, manager, admin')
];

/*
name in description sta obvezna
priority one of 1 2 3 4 5
time_limit now or after
status one of enum: ['pending', 'ongoing', 'canceled', 'completed']

*/
exports.createtask = [
    body('name').exists().withMessage('Task must be named'),

    body('description').exists().withMessage('Task must have a description'),
    
    body('priority').optional().isIn(['1', '2', '3', '4', '5']).withMessage("priority must be one of: '1', '2', '3', '4', '5'"),

    body('time_limit').optional().isAfter().withMessage('time_limit must be a time in the future'),

    body('status').optional().isIn(['pending', 'ongoing', 'canceled', 'completed']).withMessage("status must be one of: 'pending', 'ongoing', 'canceled', 'completed'")
];


exports.updatetask = [
    
    body('priority').optional().isIn(['1', '2', '3', '4', '5']).withMessage("priority must be one of: '1', '2', '3', '4', '5'"),

    body('time_limit').optional().isAfter().withMessage('time_limit must be a time in the future'),

    body('status').optional().isIn(['pending', 'ongoing', 'canceled', 'completed']).withMessage("status must be one of: 'pending', 'ongoing', 'canceled', 'completed'")
];


/*
name mora bit
*/
exports.group = [
    body('name').exists().withMessage('Group must have a name').isLength({min:3}).withMessage('Group must have a name'),
];

/*
content mora bit
*/

exports.comment = [
    body('content').exists().withMessage('The Comment must have some content').isLength({min:1}).withMessage('content must be at least one character')
]