// user CRUD Operations routes

const authRouter = require('express').Router();
const debug = require('debug')('app:authRouter');

let User = require('../models/user.js');
//let Course = require('../models/course.js');

//this post is called when the user submits the password
authRouter.route('/signUp').post((req,res) => {
    let Users = new User(
        {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        });
    User.register(Users, req.body.password, function(err, user){
        if(err) {
            res.json({success: false, message: `Your account could not be saved. Error: `, err})
        }else{
            res.json({success: true, message: `Your account has been saved`})
        }
    });
});

//this post is called when the user submits the password
authRouter.route('/login').post((req, res) => {
    let Users = new User({email : req.body.email, username : req.body.username});
        User.register(Users, req.body.password, function(err, user){
            if (err){
                res.json({success:false, message: `Your account could not be saved. Error: `,err})
            }else{
                console.log("login successful")
                res.json({success: true, message: `Your account has been saved`})
            }
        });
});

module.exports = authRouter;