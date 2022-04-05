//https://www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const app = express();
const PORT = process.env.PORT || 3000;

//Start Session Management
const expressSession = require('express-session');
app.use(expressSession({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));
//End Session Management

const User = require('./src/models/user')
//Start Express app server middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Start body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
//End body-parser middleware

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));

//Start Front End
//ADD insert Views
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { title: 'IFT 458/598 Lab 2', date: new Date()});
  });
//End Front End

// Start Route Middleware
const courseRouter = require('./src/routers/courseRouter');
app.use('/course', courseRouter);
// End Route Middleware 



//Start LOG-IN, SIGN-UP, LOGOUT
app.get('/signup',(req,res) => {
    res.render('signup', {title:"SignUp", date: new Date()})
});

//this post is called when you want to create a new user
app.post('/signup',(req,res) =>{
    let currentLogInUser = new User(
        {
            email: req.body.email,
            username: req.body.username,
        });
        let password = req.body.password;
        //you need to pass the user object and the password as this used to hash the password
        User.register(currentLogInUser, password, function(err, user){
            if(err){
                res.render('invalidCredentials',{title:"Invalid Credentials", date: new Date()});
            }else{
                console.dir(user);
                res.render('index',{title:`
                User: ${currentLogInUser.username}
                Email: ${currentLogInUser.email} was created successfully`,
                date: new Date()});
            }
        });
});

//Start LOG-IN, SIGN-UP, LOGOUT
app.get('/login',(req, res) => {
    res.render('login')});

// this is called when you want to authenticate the user
app.post('/login',(req,res,next) => {
    if(!req.body.username){
        res.render('invalidCredential',{title:`Invalid User Credentials: ${req.body.username}`, date: new Date()});
    } else {
        if(!req.body.password){
            res.render('invalidCredential',{title:`Invalid User Credentials: ${req.body.username}`, date: new Date()});
        }else{
            passport.authenticate('local', (err, user, info) => {
                if(err){
                    res.render('invalidCredential',{title:`Invalid User Credentials: ${req.body.username} Info : ${info}`, date: new Date()});
                } else {
                    if(!user){
                        res.render('invalidCredential',{title:`Invalid User Credentials: ${req.body.username} Info: ${info}`, date: new Date()});
                    }else {
                        req.login(user, (err) => {
                            if(err){
                                res.render('invalidCredential',{title:`Invalid User Credentials: ${req.body.username} Info: ${info}`, date: new Date()});
                            }else{
                                res.render('index', {title: `User: ${req.body.username} is authenticated Successfully`, date: new Date()})
                            }
                        })
                    }
                }
            })(req,res,next);
        }
    }
});

// app.post('/login',passport.authenticate('local',{failureRedirect: '/'}), function(req,res){
//     console.log(req.user)
//     res.render('index',{title:`User: ${req.body.username} is authenticated Successfully`, date: new Date()});
// });

app.get('/logout',(req,res) => {
    req.logout();
    res.render('index',{title:"The user is logged out successfully", date: new Date()})
});
//END LOGIN, LOGOUT, SIGNIN

//START OF MONGO_DB
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const uri = "mongodb+srv://nveluru:rootpassword@cluster0.ij10k.mongodb.net/student_life_cycle?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('Error', ()=>{
  console.log("MongoDB database connection was not successfully");
});
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//END OF MONGO_DB

//Start Node App Server
const nodeSeverPort = `listening on port ${chalk.green(PORT)}`;
app.listen(PORT, () => {
  console.log(nodeSeverPort);
});