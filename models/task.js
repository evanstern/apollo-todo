const { Schema, model, models } = require('mongoose');

const TaskSchema = new Schema({
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
});

module.exports = models.Task || model('Task', TaskSchema);
