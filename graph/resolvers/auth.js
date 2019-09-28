const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { recursiveTasks } = require('./utils');

const Query = {
  allUsers: async (_, _args, { user }) => {
    if (!user) {
      throw new Error('Unauthenticated');
    }

    const results = await User.find();
    return results.map(r => ({
      ...r._doc,
      tasks: recursiveTasks(r._doc.tasks),
    }));
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(`User with email ${email} does not exist.`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      'secretkey',
      {
        expiresIn: '1h',
      }
    );

    return {
      userId: user.id,
      token,
      tokenExpiration: 1,
    };
  },
};

const Mutation = {
  addUser: async (_, { user: { email, password } }, { user: authUser }) => {
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
};

exports.Query = Query;
exports.Mutation = Mutation;
