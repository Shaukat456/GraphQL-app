import { ApolloServer , gql} from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import  {randomBytes} from "crypto"
import mongoose from 'mongoose'
// import Quotes from  "models/Quotes.js"
// import Student from  "models/Student.js"
import bcrypt from 'bcryptjs'





//Collection  = students

//doc1 //doc2 are the documetns of collection


mongoose.connect("mongodb+srv://shaukat:12345@cluster0.x8ihi.mongodb.net/MiniSocialApp?retryWrites=true&w=majority", {
    useNewUrlParser:true,
    useUnifiedTopology:true,


})


mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDB")
})
mongoose.connection.on("error",(err)=>{
        console.log("error connecting ", err)
})

//model 




export const students=[
    {
        _id:'1',
        name:"Shaukat",
        lastName:"sohail",
        password:"12345"
    },
    {
        _id:'2',
        name:"Ahmed",
        lastName:"iqbal",
        password:"654987"
    }
]


//Collection  = quotes

export const quotes=[

    {
        name:"this is a quote by me ",
        by:'1'  // by which user   // refers to the _id of the student 
    },
    {
        name:"hello there is not a quote ",
        by:'2'
    }
]


const Quotes_Schema= new mongoose.Schema({
   
    name:{
        type:String,
},

by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student"  // it is referring to Student model 
}


})


const Quotes_Model=mongoose.model("Quotes",Quotes_Schema)





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

const Student_model = mongoose.model("Student",student_Schema)






const typeDefs = gql    
`
type  Query{
    students : [Students]
    istudent(_id:ID!):Students
    quotes : [Quotes]

}

 type Students{
     _id:ID!
     name:String 
     lastName:String 
     password:String 
     quotes:[Quotes]
}

type Quotes{
    name:String
    by:String
}

type Mutation{
    signUpStudent(StudentNew:StudentInput):Students 
}

input StudentInput{
    name:String 
    lastName:String
    password:String
} 

`


const resolvers_obj={

    Query:{
      
        students:()=>students,
        quotes:()=>quotes,
        istudent:(parent, {_id})=>students.find(std=> std._id==_id)
        

    },
    // Student is the parent of quote
    Students:{
        quotes:(student_received)=>{
           return  quotes.filter(quote=> quote.by==student_received._id)
        }
    } ,
    Mutation:{
        signUpStudent: async (_, {StudentNew})=>{
            console.log("student new " , StudentNew)
           const check_already_exist=await  Student_model.findOne({
                // lastName:StudentNew.lastName
            })
            console.log(check_already_exist)

            try{
                // if(check_already_exist){
                //     throw new Error("Student with this name already exist ")
                // }
                
                //hash password before saving
                
                // const hashedPassword= await bcrypt.hash(StudentNew.password, 10)
                // console.log(hashedPassword)
                
                const Register_Student = new Student_model({
                    ...StudentNew,
                    
                    //overwritting password field of student new 
                    // password:hashedPassword
                })
                const Saved=await Register_Student.save()
                // console.log(Saved)
                return Saved;
                
            }
            catch(err){
                console.log(err)
                return err;
            }

            
        }

       
        
    }

}
const server=new ApolloServer({
    typeDefs,
    resolvers:resolvers_obj,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]

})

server.listen(80).then(({url})=>{
    console.log('server started on port ' +url)
})