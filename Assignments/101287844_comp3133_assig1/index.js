const Schema = require('./schema');
const Resolvers = require('./resolvers');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json()); 
app.use('*', cors());

mongoose.connect('mongodb+srv://mingyang:199537@cluster0.xhrua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

const server = new ApolloServer({
    typeDefs: Schema.typeDefs,
    resolvers: Resolvers.resolvers,
    context: ({req}) =>({req})
});




server.start().then(res => {
    server.applyMiddleware({ app, path: '/' });
    app.listen(8081, () => { console.log('Server is running...') });  
  });