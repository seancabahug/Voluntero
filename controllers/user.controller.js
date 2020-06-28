const userModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const notAllowedUserNames = require('./notAllowed.json').taken;

exports.login = (req, res, next) => {
    console.log(notAllowedUserNames.indexOf(req.body.username))
    if (notAllowedUserNames.indexOf(req.body.username) < 0) {
        userModel.findOne(req.body.username ? {username: req.body.username} : {email: req.body.email})
        .exec()
        .then(identification => {
            if (!identification) {
                return res.status(401).send({
                    error: "Authentication failed. (ERR:01)"
                })
            } else {
                bcrypt.compare(req.body.password, identification.password, function(err, result) {
                    if (result) {
                        const token = jwt.sign({accountId: identification._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
                        return res.status(201).send({
                            message: "Login successful!",
                            token: token
                        })
                    } else {
                        return res.status(401).send({
                            error: "Authentication failed. (ERR:02)"
                        })
                    }
                });
            }
        });
    } else {
        return res.status(401).send({
            error: "Authentication failed. (ERR:03)"
        })
    }
}

exports.register = (req, res, next) => {
    if (!notAllowedUserNames.indexOf(req.body.username) < 0) {
        return res.status(401).send({
            error: "Authentication failed. (ERR:03)"
        })
    }
    userModel.findOne({username: req.body.username}, (err, user) => {
        if (err) console.log(err);
        if (user) {
            return res.status(403).send({
                error: 'Sorry, that username is in use!'
            })
        } else {
            if(req.body.password){
                bcrypt.genSalt(10, function(err, salt) { 
                    // Generate salt
                    bcrypt.hash(req.body.password, salt).then(hash => {
                        var userObject = new userModel({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            location: req.body.location
                        });
                        userObject.save().then(userObj => { // Add user to database
                            res.status(201).send({
                                message: "User successfully registered!",
                                user: userObj
                            });
                        }).catch(errrrrrr => {
                            res.status(500).send({
                                error: errrrrrr
                            });
                        })
                    }).catch(err => {
                        console.error(err);
                    });
                    
                })
            } else {
                return res.status(400).send({
                    error: "Oops, you password field is blank!"
                });
            }
        }
    });
}
