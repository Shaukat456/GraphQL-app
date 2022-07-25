import { ApolloServer , gql} from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'



const typeDefs = gql
`
 type Query{
    msg:String
 }   


`


const resolvers_obj={
    Query:{
        msg:()=>{
            return 'A msg '
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