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
    body('username').optional().withMessage('Username must exits')
            .isAlphanumeric().withMessage('Username must be alphanumeric')
            .isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
        
        body('email').optional().isEmail().withMessage('Email must be valid').normalizeEmail(),

        body('password').optional().withMessage('Password must be provided')
            .isLength({min: 5}).withMessage('Password must be at least 5 characters long'),

        body('privilege').optional().isIn(['worker', 'manager', 'admin']).withMessage('Privilege must be one of: worker, manager, admin')
];