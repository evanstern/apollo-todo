const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = models.User || model('User', UserSchema);
