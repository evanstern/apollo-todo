const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
    createdBy: User!
  }

  input TaskInput {
    name: String!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    tasks: [Task!]
  }

  input UserInput {
    email: String!
    password: String!
  }

  type Auth {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Query {
    allTasks: [Task!]!
    allUsers: [User!]!
    login(email: String!, password: String!): Auth!
  }

  type Mutation {
    addTask(task: TaskInput!): Task!
    addUser(user: UserInput!): User!
  }
`;

module.exports = typeDefs;
