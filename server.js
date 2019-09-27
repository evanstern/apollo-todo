const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Task = require('./models/Task');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://mongo:27017/todo', {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const tasks = async taskIds => {
  const tasks = await Task.find({ _id: { $in: taskIds } });
  return tasks.map(t => ({ ...t._doc, createdBy: user(t._doc.createdBy) }));
};

const user = async userId => {
  const user = await User.findById(userId);
  return { ...user._doc, tasks: tasks(user._doc.tasks) };
};

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

  type Query {
    allTasks: [Task!]!
    allUsers: [User!]!
  }

  type Mutation {
    addTask(task: TaskInput!): Task!
    addUser(user: UserInput!): User!
  }
`;

const resolvers = {
  Query: {
    allTasks: async () => {
      const results = await Task.find();
      return results.map(r => ({
        ...r._doc,
        createdBy: user(r._doc.createdBy),
      }));
    },

    allUsers: async () => {
      const results = await User.find();
      return results.map(r => ({ ...r._doc, tasks: tasks(r._doc.tasks) }));
    },
  },
  Mutation: {
    addTask: async (_, { task: { name } }) => {
      const task = new Task({
        name,
        completed: false,
        createdBy: '5d8d10057d2cb400c9193581',
      });

      await task.save();

      let user;
      try {
        user = await User.findById('5d8d10057d2cb400c9193581');
      } catch (error) {
        console.log(error);
        await task.remove();
        throw new Error('Could not update user tasks. User could not be found');
      }

      user.tasks.push(task);
      user.save();

      return { ...task._doc };
    },

    addUser: async (_, { user: { email, password } }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
      });

      await user.save();

      return { ...user._doc };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
  console.log(`GraphQL is available at ${apolloServer.graphqlPath}`);
});
