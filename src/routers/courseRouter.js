// user CRUD Operations routes

const courseRouter = require('express').Router();
let User = require('../models/user');
let Course = require('../models/course');
const connectEnsureLogin = require('connect-ensure-login'); 

courseRouter.route('/').get(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    Course.find()
        .then(courses => res.render('course',{title:`The Course for the Student: ${req.body.username}`,date: new Date()}))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/add').post(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    //const name = req.body.name;
    // const sem = req.body.semester;
    const course = new Course({ name: req.body.name , semester: req.body.semester});

    course.save()
        .then(() => res.json('Course added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').get(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    Course.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').delete(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Course deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').put(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    Course.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('Course updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = courseRouter;

