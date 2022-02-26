const express = require("express")
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

//1 create graphql schema ! make field mandatory, ie: name:String!
let gqlSchema = buildSchema(
    `type Query{
        message: String
        name: String
        greet(name: String): String 
        getStudent: Student,
        getStudents: [Student]
    },
    type Student{
        id: Int,
        first_name: String,
        last_name: String,
        city: String,
        result: String
    }
    `
)

let myName = () => {
    return 'Ming Yang'
}

let getStudent = () =>{
    let s={
        id: 1,
        first_name: "Ming",
        last_name: "Yang",
        city: "Toronto",
        result: "Pass"
    }

    return s
}

let getStudents = () =>{
    let s={
        id: 1,
        first_name: "Ming",
        last_name: "Yang",
        city: "Toronto",
        result: "Pass"
    }

    return [s,s,s,s,s]
}

//2 Define Query Resolver
let gqlResolver = {
    message: () => 'Hello World',
    name: myName,
    greet: (args) => {
        return `Welcome, ${args.name ? args.name:"Ming Yang"}`
    },
    getStudent,
    getStudents
}

/*
query greetMultiple($n1: String, $n2: String)
{
	n1: greet(name: $n1)
    n2: greet(name: $n2)
    message
}

query greetMultiple
{
	m1: message
    m2: message
    m3: message
}

query{
  s1:getStudent{
    id
    first_name
    last_name
    city
    result
  }
  s2:getStudent{
    id
    first_name
    last_name
    city
    result
  }
}
*/

//3 create graphqlHTTP middleware object
let gqlHttp = graphqlHTTP({
    schema: gqlSchema, //set schema
    rootValue: gqlResolver, //set resolver
    graphiql: true //this is the interface, client access
})

//4 create express with GraphQL
let app = express()
app.use((req, res, next) => {
    console.log(`Before GQL ${Date().toString()}`)
    console.log(req)
    next()
})
app.use('/graphql', gqlHttp)

//5 start the server
app.listen(8081, ()=>{
    console.log('GraphQL Server Running at http://localhost:8081/graphql')
})