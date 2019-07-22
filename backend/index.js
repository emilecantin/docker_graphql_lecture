const { ApolloServer, gql } = require('apollo-server');
const pg = require('pg');

const client = require('knex')({
  client: 'pg',
  connection: {
    database: 'lhl_todo',
  }
});


const typeDefs = gql`
  """
  This is the project model
  We can define some documentation here, and it'll appear in the
  GraphQL Playground.
  """
  type Project {
    id: ID!

    """
    We can document fields, too!
    """
    name: String
    owner: String
    tasks: [Task]
  }

  type Task {
    id: ID
    name: String
    completed: Boolean
    project: Project
  }

  type Query {
    projects: [Project]
    tasks: [Task]
  }

  type Mutation {
    completeTask(id:ID): Task
  }

`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    projects: () => client.select().from('projects'),
    tasks: () => client.select().from('tasks'),
  },
  Project: {
    tasks: (project) => client.select().from('tasks').where({project_id: project.id})
  },
  Task: {
    // project: task => ({name: JSON.stringify(task.project_id)})
    project: task => client.select().from('projects').where({id: task.project_id}).then(results => results[0])
  },

  Mutation: {
    completeTask: async (parent, args) => {
      await client('tasks').where({id: args.id}).update({completed: true})
      const results = await client.select().from('tasks').where({id: args.id});
      return results[0];
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
