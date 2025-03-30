const express = require('express');
const mongoose = require('mongoose');

const typeDefs = require('./models/graphSchema');
const resolvers = require('./Resolvers');

const {ApolloServer} = require('apollo-server-express');

const app = express();

mongoose.connect("mongodb+srv://admin:pass@comp3123cluster.arhm6.mongodb.net/comp3133_101400506_assigment1?retryWrites=true&w=majority")
.then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});



async function startServer() {

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers: [resolvers]
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

 