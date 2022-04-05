// user CRUD Operations routes

const studentGradeRouter = require('express').Router();
let studentGrade = require('../models/studentGrade');
const connectEnsureLogin = require('connect-ensure-login'); 

studentGradeRouter.route('/').get(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    studentGrade.find()
        .then(studGrade => res.render('course',{title:`The Course for the Student: ${req.body.username}`,date: new Date()}))
        .catch(err => res.status(400).json('Error: ' + err));
});

studentGradeRouter.route('/add').post(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    //const name = req.body.name;
    // const sem = req.body.semester;
    const studGrade = new studentGrade({ username: req.body.username , coursename: req.body.coursename, 
        grade: req.body.grade});

    studGrade.save()
        .then(() => res.json('Student grade added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

studentGradeRouter.route('/:id').get(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    studentGrade.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

studentGradeRouter.route('/:id').delete(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    studentGrade.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Student Grade deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

studentGradeRouter.route('/:id').put(connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    studentGrade.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;

            user.save()
                .then(() => res.json('Student Grade updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = studentGradeRouter;

