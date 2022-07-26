import { ApolloServer , gql} from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'



//Collection  = students

//doc1 //doc2 are the documetns of collection


export const students=[
    {
        id:'1',
        name:"Shaukat",
        lastName:"sohail",
        password:"12345"
    },
    {
        id:'2',
        name:"Ahmed",
        lastName:"iqbal",
        password:"654987"
    }
]


//Collection  = quotes

export const quotes=[

    {
        name:"this is a quote by me ",
        by:'1'  // by which user   // refers to the id of the student 
    },
    {
        name:"hello there is not a quote ",
        by:'2'
    }
]



const typeDefs = gql
`
type  Query{
    students : [Students]
    istudent(id:ID!):Students
    quotes : [Quotes]

}

 type Students{
     id:ID!
     name:String 
     lastName:String 
     password:String 
     quotes:[Quotes]
}

type Quotes{
    name:String
    by:String
}
`


const resolvers_obj={
    Query:{
      
        students:()=>students,
        quotes:()=>quotes,
        istudent:(parent, {id})=>students.find(std=> std.id==id)
        

    },
    // Student is the parent of quote
    Students:{
        quotes:(student_received)=>{
           return  quotes.filter(quote=> quote.by==student_received.id)
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