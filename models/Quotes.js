import mongoose from "mongoose";

const Quotes_Schema= new mongoose.Schema({
   
    name:{
        type:String,
},

by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"  // it is referring to Student model 
}


})

mongoose.model("Quotes",Quotes_Schema)