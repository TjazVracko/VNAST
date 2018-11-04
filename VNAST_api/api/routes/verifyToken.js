var jwt = require('jsonwebtoken');
var config = require('../../config');


var mongoose = require('mongoose'),
    User = mongoose.model('Users');

// middleware funkcija za verifikacijo tokena, dodamo jo v vsak route, ki zahteva loginanega uporabnika (ki mora obstajat)
exports.token = function(req, res, next) {
    var token = req.headers['x-access-token'];
    //console.log(token);
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided (x-access-token).' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // check if user exists
        else User.findById(decoded.id, { password: 0 }, function(err, user) {
            if (err)
                return res.send(err);
            // res.json(user);
            if(!user)
                return res.status(404).send({ auth: false, message: "You don't exist" });
                // return res.status(403).send({ auth: false, message: "User doesn't exits" });
           
            req.user = user;  // v funkcijci naprej, ki handla dejanski api klic, imamo potem že userja shranjenega v req.user (ga nerabimo z baze ponovno jemat)
            next();
        });
    });
};

// če zahtevamo worker privileges, je to enako kot token privileges:
exports.worker = exports.token;


// zahtevamo manager+
exports.manager = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided (x-access-token).' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // check if user has manager privileges
        else User.findById(decoded.id, { password: 0 }, function(err, user) {
            if (err)
                return res.send(err);
            // res.json(user);
            if(!user)
                return res.status(404).send({ auth: false, message: "You don't exist" });
                // return res.status(403).send({ auth: false, message: "User doesn't exits" });
            if(user.privilege != "manager" && user.privilege != "admin")
                return res.status(403).send({ auth: false, message: 'Route requires manager privileges' });
            
            req.user = user;;
            next();
        });
    });
};

// zahtevamo admin
exports.admin = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided (x-access-token).' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // check if user has manager privileges
        else User.findById(decoded.id, { password: 0 }, function(err, user) {
            if (err)
                return res.send(err);
            // res.json(user);
            if(!user)
                return res.status(404).send({ auth: false, message: "You don't exist" });
                // return res.status(403).send({ auth: false, message: "User doesn't exits" });
            if(user.privilege != "admin")
                return res.status(403).send({ auth: false, message: 'Route requires admin privileges' });
           
            req.user = user;
            next();
        });
    });
};