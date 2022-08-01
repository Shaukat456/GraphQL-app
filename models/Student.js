import mongoose from "mongoose";

const student_Schema= new mongoose.Schema({
   
    name:{
        type:String,
},

lastName:{
    type:String
},
password:{
    type:String
}



})

mongoose.model("Student",student_Schema)