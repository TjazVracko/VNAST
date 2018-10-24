'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Naloga
var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Enter the name of the task'  // če preko posta ustvariš objekt in ne pošleš "required" polja, potem api vrne error msg v katerem je ta text zapisan
    },
    description: {
        type: String,
        required: 'Enter the name of the task'
        },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);


// Uporabnik
var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Must have username'
    },
    hashed_password: {
        type: String,
        required: 'A password must exits for the user'
    },
    email: {
        type: String,
        // required: 'A rabimo mail?'
    },
    // ...
});
module.exports = mongoose.model('Users', UserSchema);

// ...
// mogoče vsak model v posebej datoteko? Bo bolj pregledno