const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const studentGradeSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    coursename: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    grade: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
})

studentGradeSchema.plugin(passportLocalMongoose);
const studentGrade = mongoose.model('StudentGrade',studentGradeSchema);
module.exports = studentGrade;

// //START OF MONGO_DB

// const uri = "mongodb+srv://nveluru:rootpassword@cluster0.ij10k.mongodb.net/student_life_cycle?retryWrites=true";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.on('Error', ()=>{
//   console.log("MongoDB database connection was not successfully");
// });
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// });

// //END OF MONGO_DB

// User.register({ username: 'danny', email: 'candy@candy.com' }, 'mysecretpassword');
// User.register({ username: 'jeniffer', email: 'starbuck@starbuck.com' }, 'myCandy');