const auth = require('./auth');
const task = require('./task');

const resolvers = {
  Query: {
    ...auth.Query,
    ...task.Query,
  },
  Mutation: {
    ...auth.Mutation,
    ...task.Mutation,
  },
};

module.exports = resolvers;
