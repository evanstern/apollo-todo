const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = async ({ req }) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return {};
  }

  const token = authorization.split(' ').pop();

  if (!token || token === '') {
    return {};
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretkey');
  } catch (err) {
    return {};
  }

  if (!decodedToken) {
    return {};
  }

  let user;
  try {
    user = await User.findById(decodedToken.userId);
  } catch (err) {
    return {};
  }

  return {
    user,
  };
};
