const { Schema, model } = require('mongoose');

module.exports = model(
  'Task',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  })
);
