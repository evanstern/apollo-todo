const User = require('../../models/User');
const Task = require('../../models/Task');

const recursiveTasks = async taskIds => {
  const tasks = await Task.find({ _id: { $in: taskIds } });
  return tasks.map(t => ({
    ...t._doc,
    // you have to use `bind(this...)` to prevent an infinite loop
    createdBy: recursiveUser.bind(this, t._doc.createdBy),
  }));
};

const recursiveUser = async userId => {
  const user = await User.findById(userId);
  // you have to use `bind(this...)` to prevent an infinite loop
  return { ...user._doc, tasks: recursiveTasks.bind(this, user._doc.tasks) };
};

exports.recursiveTasks = recursiveTasks;
exports.recursiveUser = recursiveUser;
