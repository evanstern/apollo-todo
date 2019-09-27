const User = require('../../models/user');
const Task = require('../../models/task');

const { recursiveUser } = require('./utils');

const Query = {
  allTasks: async (_, _args, { user }) => {
    if (!user) {
      throw new Error('Unauthenticated');
    }

    const results = await Task.find();
    return results.map(r => ({
      ...r._doc,
      createdBy: recursiveUser(r._doc.createdBy),
    }));
  },
};

const Mutation = {
  addTask: async (_, { task: { name } }, { user }) => {
    if (!user) {
      throw new Error('Unauthenticated');
    }

    const task = new Task({
      name,
      completed: false,
      createdBy: user.id,
    });

    await task.save();

    user.tasks.push(task);
    user.save();

    return { ...task._doc };
  },
};

exports.Query = Query;
exports.Mutation = Mutation;
